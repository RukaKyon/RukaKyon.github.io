/* background.js (修正版) */

let t = 0;

function setup() {
  // キャンバスを作成
  let canvas = createCanvas(windowWidth, windowHeight);
  
  // ★重要★ 作成したキャンバスを、HTMLで作った「専用の箱」の中に入れる
  canvas.parent('canvas-container');
  
  noStroke();
}

function draw() {
  // 背景の描画（透明度付き）
  background(30, 30, 30, 50);

  let waveCount = 5;

  for (let i = 0; i < waveCount; i++) {
    if (i % 2 == 0) {
      fill(0, 209, 178, 100);
    } else {
      fill(255, 221, 87, 80);
    }

    beginShape();
    vertex(0, height); // 左下

    for (let x = 0; x <= width; x += 20) {
      let y = map(
        noise(x * 0.005, i * 0.5, t), 
        0, 1, 
        height * 0.4, height
      );
      vertex(x, y);
    }

    // ★修正★ 右下の点を有効にして、形を閉じるようにしました
    vertex(width, height); 
    
    endShape(CLOSE);
  }

  t += 0.005;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
