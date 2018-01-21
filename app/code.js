'use strict';

import CryptoJS from 'crypto-js';
/* globals console */
function incrementalDemoInit() {
	document.getElementById('file').addEventListener('change', function () {
		var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
			file = this.files[0],
			chunkSize = 2097152,                             // Read in chunks of 2MB
			chunks = Math.ceil(file.size / chunkSize),
			currentChunk = 0,
			//spark = new SparkMD5.ArrayBuffer(),
			fileReader = new FileReader();
		

		function loadNext() {
			var start = currentChunk * chunkSize,
				end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

			fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
		}
		
		var algo = CryptoJS.algo.SHA256.create();
		
		fileReader.onload = function (e) {
			console.log('read chunk nr', currentChunk + 1, 'of', chunks);
			//spark.append(e.target.result);                   // Append array buffer
			algo.update(CryptoJS.lib.WordArray.create(e.target.result));
			currentChunk++;

			if (currentChunk < chunks) {
				loadNext();
			} else {
				console.log('finished loading');
				//console.info('computed hash', spark.end());  // Compute hash
				var hash = algo.finalize();
				console.info('computed hash', hash.toString(CryptoJS.enc.Hex));  // Compute hash
			}
		};
		
		fileReader.onerror = function () {
			console.warn('oops, something went wrong.');
		};
		
		loadNext();
	});
}

// In this way, the function is reachable from HTML
window.incrementalDemoInit = incrementalDemoInit;