// Get the youtube url
var yt_url   = 'https://www.youtube.com/watch?v=cYaZCUZzfPM';
var base_uri = 'http://YoutubeInMP3.com/fetch/?api=advanced&format=JSON&video=';
/*
var req = new XMLHttpRequest ();
req.open ( 'GET', base_uri+yt_url, false );
req.send(null);
if (req.status == 200)
  console.log (req.responseText); */
var mp3_url = "http://youtubeinmp3.com/download/grabber/?mp3=_Pulse_Tone_Eternally.mp3&n=0&t=%E2%99%AB+Pulse+Tone+%2F+Eternally&s=5&id=cYaZCUZzfPM";
// Create a new instance of an audio object and adjust some of its properties
var audio = new Audio();
audio.src = mp3_url;
audio.controls = true;
audio.loop = true;
audio.autoplay = true;
// Establish all variables that your Analyser will use
var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
// Initialize the MP3 player after the page loads all of its HTML into the window
window.addEventListener("load", initMp3Player, false);
function initMp3Player(){
	document.getElementById('audio_box').appendChild(audio);
	context = new webkitAudioContext(); // AudioContext object instance
	analyser = context.createAnalyser(); // AnalyserNode method
	canvas = document.getElementById('analyser_render');
	ctx = canvas.getContext('2d');
	// Re-route audio playback into the processing graph of the AudioContext
	source = context.createMediaElementSource(audio);
	source.connect(analyser);
	analyser.connect(context.destination);
	frameLooper();
}
// frameLooper() animates any style of graphics you wish to the audio frequency
// Looping at the default frame rate that the browser provides(approx. 60 FPS)
function frameLooper(){
	window.webkitRequestAnimationFrame(frameLooper);
	fbc_array = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(fbc_array);
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
	ctx.fillStyle = '#00CCFF'; // Color of the bars
	bars = 100;
	for (var i = 0; i < bars; i++) {
		bar_x = i * 3;
		bar_width = 2;
		bar_height = -(fbc_array[i] / 2);
		//fillRect( x, y, width, height ) // Explanation of the parameters below
		ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
	}
}


