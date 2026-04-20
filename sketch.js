let input;
let slider;
let button;
let isBouncing = false;
let iframeDiv;
let selector;


function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput('');
  input.position(20, 20);
  input.size(200, 50);
  input.style('font-size', '30px');
  input.style('color', '#d85473');

  button = createButton('跳動');
  button.position(240, 20);
  button.size(100, 25);
  button.mousePressed(() => isBouncing = !isBouncing);

  selector = createSelect();
  selector.position(350, 20);
  selector.size(100, 25);
  selector.option('淡江大學');
  selector.option('淡江教科系');
  selector.changed(() => {
    let url = selector.value() === '淡江大學' ? 'https://www.tku.edu.tw' : 'https://www.et.tku.edu.tw/';
    iframeDiv.html('<iframe src="' + url + '" style="width:100%; height:100%; border:none;"></iframe>');
  });

  slider = createSlider(15, 80, 30, 1);
  slider.position(240, 50);
  slider.size(100, 20);

  // 建立一個 DIV，內含 iframe 以顯示網頁，並設定四周 200px 的內距
  iframeDiv = createDiv('<iframe src="https://www.tku.edu.tw" style="width:100%; height:100%; border:none;"></iframe>');
  iframeDiv.position(200, 200);
  iframeDiv.size(windowWidth - 400, windowHeight - 400);


  textSize(30);
  textAlign(LEFT, BASELINE);
}


function draw() {
  background(220);
  let txt = input.value();
  let fontSize = slider.value();
  textSize(fontSize);

  if (txt.length > 0) {
    let tw = textWidth(txt);
    let rowIdx = 0;
    for (let y = 100; y < height; y += 50) {
      let dir = (rowIdx % 2 === 0) ? 1 : -1; // 偶數行為 1，奇數行為 -1
      for (let x = 0; x < width; x += tw) {
        let bounceY = 0;
        if (isBouncing) {
          // 乘上 dir 來改變波浪傳遞方向
          bounceY = sin(frameCount * 0.1 + x * 0.05 * dir) * 15;
        }
        text(txt, x, y + fontSize / 2 + bounceY);
      }
      rowIdx++;
    }
  }
}
