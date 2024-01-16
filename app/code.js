'use strict';

import CryptoJS from 'crypto-js';
/* globals console */
function incrementalDemoInit() {
	document.getElementById('file').addEventListener('change', function () {
		const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
		//spark = new SparkMD5.ArrayBuffer(),
		let currentChunk = 0;
		const file = this.files[0];
		const chunkSize = 2097152;                             // Read in chunks of 2MB
		const chunks = Math.ceil(file.size / chunkSize);
		const fileReader = new FileReader();
		

		function loadNext() {
			const start = currentChunk * chunkSize,
				end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

			fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
		}
		
		const algo = CryptoJS.algo.SHA256.create();
		
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
				const hash = algo.finalize();
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