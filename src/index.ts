import './style.css';
import p5 from 'p5';
import { connectSocket, sendMessage } from './socketIO';

const sketch = (s: p5) => {
  const socket = connectSocket();

  const density = 'ÑÑ@@##WW$$??!!;;::++==--,,..__      ';

  const video = s.createCapture(s.VIDEO) as any;
  const asciiDiv = s.createDiv();

  s.setup = () => {
    s.noCanvas();
    video.size(200, 200);
    video.hide();
  };

  s.draw = () => {
    video.loadPixels();

    let asciiHtml = '';
    let asciiSocketMessage = '';

    for (let i = 0; i < video.width; i++) {
      for (let j = 0; j < video.height; j++) {
        const pixelIndex = (j + i * video.width) * 4;

        const r = video.pixels[pixelIndex + 0];
        const g = video.pixels[pixelIndex + 1];
        const b = video.pixels[pixelIndex + 2];
        const avg = (r + g + b) / 3;

        const len = density.length;
        const charIndex = s.floor(s.map(avg, 0, 255, len, 0));

        const char = density.charAt(charIndex);

        if (char === ' ') {
          asciiHtml += '&nbsp;';
        } else {
          asciiHtml += char;
        }

        asciiSocketMessage += char;
      }

      asciiHtml += '<br/>';
      asciiSocketMessage += '\n';
    }

    asciiDiv.html(asciiHtml);
    sendMessage(socket, 'ascii', asciiSocketMessage);
  };
};

const sketchInstance = new p5(sketch);
