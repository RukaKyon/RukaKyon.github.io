/* js/background.js */

// 変数の定義
let t = 0; // 時間の経過用

function setup() {
  // ウィンドウ全体のサイズのキャンバスを作成
  let canvas = createCanvas(windowWidth, windowHeight);
  
  // キャンバスを背景として固定するためのスタイル設定
  canvas.position(0, 0);
  canvas.style('z-index', '-1'); // コンテンツの後ろに配置
  canvas.style('position', 'fixed'); // スクロールしても動かないように固定
  
  noStroke();
}

function draw() {
  // 背景色（CSSのbody背景色 #1e1e1e と同じか、少し透明度を持たせる）
  background(30, 30, 30, 50); // 最後の数字は「残像」の強さ（小さいほど残像が残る）

  // デザイン案2のアクセントカラーを使用
  // シアン: #00d1b2 (RGB: 0, 209, 178)
  // 黄色: #ffdd57 (RGB: 255, 221, 87)

  // 波の数を指定
  let waveCount = 5;

  for (let i = 0; i < waveCount; i++) {
    // 色の切り替え（偶数はシアン、奇数は黄色）
    if (i % 2 == 0) {
      fill(0, 209, 178, 100); // シアン、透明度あり
    } else {
      fill(255, 221, 87, 80); // 黄色、透明度あり
    }

    // 波を描画
    beginShape();
    vertex(0, height); // 左下からスタート

    for (let x = 0; x <= width; x += 20) {
      // ノイズ関数を使って、有機的な波の動きを作る
      // x: 横位置, i: 波の個体差, t: 時間経過
      let y = map(
        noise(x * 0.005, i * 0.5, t), 
        0, 1, 
        height * 0.4, height // 波の高さを画面の下半分に制限
      );
      vertex(x, y);
    }

    vertex(width, height); // 右下へ
    endShape(CLOSE);
  }

  // 時間を進める（波の動く速さ）
  t += 0.005;
}

// ウィンドウサイズが変更されたときにキャンバスもリサイズする
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
