import './style.css';
import p5 from 'p5';

const sketch = (s: p5) => {
  const density = 'ÑÑ@@##WW$$??!!;;::++==--,,..__      ';

  const video = s.createCapture(s.VIDEO) as any;
  const asciiDiv = s.createDiv();

  s.setup = () => {
    s.noCanvas();
    video.size(60, 60);
    video.hide();
  };

  s.draw = () => {
    video.loadPixels();

    let asciiImage = '';

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
        if (char === ' ') asciiImage += '&nbsp;';
        else asciiImage += char;
      }

      asciiImage += '<br/>';
    }

    asciiDiv.html(asciiImage);
  };
};

const sketchInstance = new p5(sketch);
