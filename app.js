/* 캔버스 크기 */
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let isPainting = false;  // 선을 그리는 중인지 나타냄

/* 캔버스 크기 설정 */
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

/* 선 굵기, 모양 설정 */
const lineWidth = document.getElementById("line-width");
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

/* 사용자가 선택한 색상 */
const colors = Array.from(document.getElementsByClassName("color"));
const color = document.getElementById("color-option");

/* 마우스 눌렀을 때 선 그리기 시작 */
function startPainting() {
  isPainting = true;
}

/* 마우스 누른 채로 움직일 때 선 그리기 */
function moveMouse(event) {
  // 마우스로 클릭한 좌표
  const x = event.offsetX;
  const y = event.offsetY;

  // 마우스가 이동한 좌표까지 선 그리기
  if(isPainting) {
    ctx.lineTo(x, y);
    ctx.stroke();
    return;
  }
  ctx.moveTo(x, y);
}

/* 마우스 누르기를 멈추면 선 그리기 멈춤 */
function cancelPainting() {
  isPainting = false;
  ctx.beginPath();  // 새로운 경로 만들기
}

/* 선 굵기 조절 */
function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

/* 사용자가 기본 색상을 선택 */
function onColorClick(event) {
  
}

/* 사용자가 기본 색상 외의 색을 선택 */
function onColorChange(event) {
  const colorValue = event.target.value;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
}

/* 마우스로 선 그리기 이벤트 추가 */
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mousemove", moveMouse);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

/* 선 굵기 조절하는 이벤트 추가 */
lineWidth.addEventListener("change", onLineWidthChange);

/* 사용자가 선택한 색으로 바꾸는 이벤트 추가 */
colors.forEach(color => color.addEventListener("change", onColorClick));
color.addEventListener("change", onColorChange);