/* Shared Poisson chart draw helpers for Win98 pages. No Plotly. */
(function (global) {
  "use strict";

  var MAX_K = 8;
  var Y_MAX = 1.0;
  var VGA = [
    "#ff0000", "#00ff00", "#0000ff", "#ffff00",
    "#ff00ff", "#00ffff", "#800000", "#008000",
    "#000080"
  ];

  function logFact(n) {
    var s = 0;
    for (var i = 2; i <= n; i++) s += Math.log(i);
    return s;
  }

  function pmf(k, lambda) {
    if (lambda <= 0) return k === 0 ? 1 : 0;
    return Math.exp(-lambda + k * Math.log(lambda) - logFact(k));
  }

  function probs(lambda) {
    var out = [];
    for (var k = 0; k <= MAX_K; k++) out.push(pmf(k, lambda));
    return out;
  }

  function lambdaFromWords(words) {
    return Math.max(0.05, words / 600);
  }

  function pad(canvas) {
    return { left: 56, right: 12, top: 12, bottom: 28 };
  }

  function setupCanvas(canvas) {
    var dpr = 1; /* keep 1 CSS px = 1 canvas px for crunch */
    /* clientWidth ignores parent zoom — correct with .w98-scale { zoom: 2 } */
    var w = Math.max(1, canvas.clientWidth || Math.floor(canvas.getBoundingClientRect().width));
    var h = Math.max(1, canvas.clientHeight || Math.floor(canvas.getBoundingClientRect().height));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    if (ctx.mozImageSmoothingEnabled !== undefined) ctx.mozImageSmoothingEnabled = false;
    if (ctx.webkitImageSmoothingEnabled !== undefined) ctx.webkitImageSmoothingEnabled = false;
    if (ctx.msImageSmoothingEnabled !== undefined) ctx.msImageSmoothingEnabled = false;
    return { ctx: ctx, w: w, h: h, dpr: dpr };
  }

  function fillRect(ctx, x, y, w, h, color) {
    if (w <= 0 || h <= 0) return;
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  }

  function plotArea(w, h, p) {
    return {
      x: p.left,
      y: p.top,
      w: w - p.left - p.right,
      h: h - p.top - p.bottom
    };
  }

  function yToPx(area, y) {
    return area.y + area.h - (y / Y_MAX) * area.h;
  }

  function drawGrid(ctx, area, style) {
    var dotted = style === "a";
    var gridColor = dotted ? "#808080" : "#c0c0c0";
    var bg = style === "a" ? "#c0c0c0" : "#ffffff";
    fillRect(ctx, area.x, area.y, area.w, area.h, bg);

    for (var i = 0; i <= 10; i++) {
      var yy = Math.round(yToPx(area, i / 10));
      if (dotted) {
        for (var x = area.x; x < area.x + area.w; x += 2) {
          fillRect(ctx, x, yy, 1, 1, gridColor);
        }
      } else {
        fillRect(ctx, area.x, yy, area.w, 1, gridColor);
      }
    }

    /* axes */
    var axis = style === "a" ? "#000080" : "#000000";
    fillRect(ctx, area.x, area.y, 1, area.h, axis);
    fillRect(ctx, area.x, area.y + area.h - 1, area.w, 1, axis);
  }

  function barGeometry(area, k) {
    var slot = area.w / (MAX_K + 1);
    var gap = Math.max(2, Math.floor(slot * 0.18));
    var bw = Math.max(4, Math.floor(slot - gap));
    var cx = area.x + slot * k + slot / 2;
    var x = Math.round(cx - bw / 2);
    return { x: x, w: bw, cx: Math.round(cx), slot: slot };
  }

  function drawBarsA(ctx, area, p) {
    for (var k = 0; k <= MAX_K; k++) {
      var g = barGeometry(area, k);
      var top = yToPx(area, p[k]);
      var bottom = area.y + area.h - 1;
      var h = Math.max(0, Math.round(bottom - top));
      fillRect(ctx, g.x, Math.round(top), g.w, h, "#000080");
    }
  }

  function drawBarsB(ctx, area, p) {
    for (var k = 0; k <= MAX_K; k++) {
      var g = barGeometry(area, k);
      var top = Math.round(yToPx(area, p[k]));
      var bottom = area.y + area.h - 1;
      var h = Math.max(0, bottom - top);
      var color = VGA[k % VGA.length];
      if (h > 0) {
        fillRect(ctx, g.x, top, g.w, h, color);
        /* 1px black border — no bottom edge (axis already draws the baseline) */
        fillRect(ctx, g.x, top, g.w, 1, "#000000");
        fillRect(ctx, g.x, top, 1, h, "#000000");
        fillRect(ctx, g.x + g.w - 1, top, 1, h, "#000000");
      }
    }
  }

  function drawStem(ctx, area, p) {
    var color = "#000080";
    for (var k = 0; k <= MAX_K; k++) {
      var g = barGeometry(area, k);
      var top = Math.round(yToPx(area, p[k]));
      var bottom = area.y + area.h - 1;
      var h = Math.max(0, bottom - top);
      fillRect(ctx, g.cx, top, 1, h, color);
      var dot = 5;
      fillRect(ctx, g.cx - Math.floor(dot / 2), top - Math.floor(dot / 2), dot, dot, color);
    }
  }

  function placeLabels(labelEl, canvas, style) {
    var p = pad(canvas);
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    var area = plotArea(w, h, p);
    labelEl.className = "chart-labels" + (style === "a" ? "" : " dark");
    labelEl.innerHTML = "";

    function add(cls, text, left, top) {
      var el = document.createElement("span");
      el.className = cls;
      el.textContent = text;
      el.style.left = Math.round(left) + "px";
      el.style.top = Math.round(top) + "px";
      labelEl.appendChild(el);
    }

    for (var i = 0; i <= 10; i += 2) {
      var yv = i / 10;
      var yy = yToPx(area, yv);
      add("ylab", yv.toFixed(1), 20, yy - 5);
    }

    for (var k = 0; k <= MAX_K; k++) {
      var g = barGeometry(area, k);
      add("xlab", String(k), g.cx - 3, area.y + area.h + 6);
    }

    /* rotate(-90deg), origin left top → place at mid-plot + half label length */
    add("ytitle", "Probability", 4, area.y + area.h / 2 + 34);
    add("xtitle", "k", area.x + area.w / 2 - 4, h - 12);
  }

  function drawChart(canvas, labelEl, style, lambda) {
    var setup = setupCanvas(canvas);
    var ctx = setup.ctx;
    var p = pad(canvas);
    var area = plotArea(setup.w, setup.h, p);
    var probsArr = probs(lambda);

    ctx.clearRect(0, 0, setup.w, setup.h);
    fillRect(ctx, 0, 0, setup.w, setup.h, "#c0c0c0");
    drawGrid(ctx, area, style);

    if (style === "a") drawBarsA(ctx, area, probsArr);
    else if (style === "b") drawBarsB(ctx, area, probsArr);
    else drawStem(ctx, area, probsArr);

    if (labelEl) placeLabels(labelEl, canvas, style);

    return probsArr;
  }

  function makeTicks(container, count) {
    container.innerHTML = "";
    for (var i = 0; i < count; i++) {
      container.appendChild(document.createElement("span"));
    }
  }

  function formatLambda(l) {
    return l.toFixed(2);
  }

  global.Poisson98 = {
    MAX_K: MAX_K,
    Y_MAX: Y_MAX,
    lambdaFromWords: lambdaFromWords,
    probs: probs,
    drawChart: drawChart,
    makeTicks: makeTicks,
    formatLambda: formatLambda,
    VGA: VGA
  };
})(window);
