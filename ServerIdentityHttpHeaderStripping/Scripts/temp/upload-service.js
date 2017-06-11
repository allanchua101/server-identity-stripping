Box.Application.addService("upload-service", function (context) {
    var uploadService = (function ($, undefined) {
        var _externals = {},
            /*
             * Configuration Constants
             */
            BLOCK_SIZE,
            BLOCK_SIZE_IN_KB = 1024,
            THREAD_COUNT = 4,
            /*
             * Utility Constants
             */
            FALSE = false,
            STR_UNDEFINED = "undefined",
            NULL = null;

        // Calculate block size
        BLOCK_SIZE = BLOCK_SIZE_IN_KB * 1024;

        /*
         * Private Methods
         */
        function _getFileExtension(fileName) {
            var re = /(?:\.([^.]+))?$/;

            return re.exec(fileName)[1];
        }

        function _getFormData(blob, block, blockLength, uploadData) {
            var formData = new FormData();

            // Append upload information
            formData.append("ChunkIndex", block.index);
            formData.append("Chunk", blob);
            formData.append("IndexCount", blockLength);
            formData.append("FileExtension", _getFileExtension(block.name));
            // Append client-code provided upload data
            for (var prop in uploadData) {
                if (uploadData.hasOwnProperty(prop)) {
                    formData.append(prop, uploadData[prop]);
                }
            }

            return formData;
        }

        function _sliceBlob(file, start, end) {
            if (typeof file.slice === STR_UNDEFINED || file.slice === NULL)
                return file.webkitSlice(start, end);
            else
                return file.slice(start, end);
        }

        function _getBlockUploaders(file, blocks, uploadData, uploadUrl, errorCallback) {
            var putBlocks = [],
                len = blocks.length;

            blocks.forEach(function (block) {
                if (block.index > 0
                       && block.index < (len - 1)) {
                    putBlocks.push(function (putBlockCallback) {
                        _sendChunk(
                            file, block, len, uploadData, uploadUrl,
                            function () {
                                putBlockCallback(NULL, block.index);
                            }, errorCallback
                        );
                    });
                }
            });

            return putBlocks;
        }

        function _getFileBlocks(inputFile) {
            var file = inputFile || {},
                fileSize = file.size,
                fileName = file.name,
                blocks = [],
                offset = 0,
                index = 0,
                chunkStart,
                chunkEnd;


            if (typeof fileSize !== STR_UNDEFINED) {
                while (offset < fileSize) {
                    chunkStart = offset;
                    // Use the file size if offset + block size is lesser 
                    // than the file size. (Applicable only if final chunk).
                    chunkEnd = Math.min(offset + BLOCK_SIZE, fileSize);

                    blocks.push({
                        name: fileName,
                        index: index,
                        start: chunkStart,
                        end: chunkEnd
                    });

                    offset = chunkEnd;
                    index++;
                }
            }

            return blocks;
        }

        function _sendChunk(file, block, totalBlocks, uploadData, uploadUrl, callback, errorCallback) {
            var blob,
                formData;

            blob = _sliceBlob(file, block.start, block.end);
            formData = _getFormData(blob, block, totalBlocks, uploadData);

            $.ajax({
                url: uploadUrl,
                data: formData,
                processData: FALSE,
                contentType: FALSE,
                type: "POST",
                success: callback,
                error: errorCallback
            });
        }

        function _uploadMultiChunkFile(file, blocks, uploadData, uploadUrl, callback, errorCallback) {
            var blockUploaders = _getBlockUploaders(file, blocks, uploadData, uploadUrl, errorCallback),
                firstBlock = blocks[0],
                finalBlock = blocks[blocks.length - 1],
                sendFinalBlock = function (error, result) {
                    _sendChunk(
                        file, finalBlock, blocks.length, uploadData,
                        uploadUrl, callback, errorCallback
                    );
                },
                sendMiddleBlocks = function () {
                    async.parallelLimit(blockUploaders, THREAD_COUNT, sendFinalBlock);
                };

            _sendChunk(
                file, firstBlock, blocks.length, uploadData,
                uploadUrl, sendMiddleBlocks, errorCallback
            );
        }

        /*
         * External Methods
         */
        _externals.upload = function (params) {
            var input = params || {},
                file = input.file,
                callback = input.callback,
                errorCallback = input.errorCallback,
                uploadData = input.uploadData,
                uploadUrl = input.uploadUrl,
                blocks;

            if (typeof file !== STR_UNDEFINED) {
                blocks = _getFileBlocks(file);

                if (blocks.length === 1) {
                    // If file can fit on a single chunk, send file
                    // right away in a single shot to target URL.
                    _sendChunk(
                        file, blocks[0], 1, uploadData,
                        uploadUrl, callback, errorCallback
                    );
                } else {
                    _uploadMultiChunkFile(
                        file, blocks, uploadData,
                        uploadUrl, callback, errorCallback
                    );
                }
            } else {
                errorCallback("File not provided.");
            }
        };

        return _externals;
    })(jQuery);

    return uploadService;
});