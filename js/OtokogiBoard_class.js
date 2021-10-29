// OtokogiBoard_class.js
'use strict';

class OtokogiBoard {
  constructor(ogidstr = "OGID=-------:00:0") {
    this.ogid = new Ogid(ogidstr);
    this.mainBoard = $('#board'); //need to define before bgBoardConfig()
    this.bgBoardConfig();
    this.prepareSvgDice();
    this.boardstyle = ["boardStyle0", "boardStyle1", "boardStyle2", "boardStyle3",
                       "boardStyle4", "boardStyle5", "boardStyle6", "boardStyle7"];
    this.setDomNameAndStyle();
  } //end of constructor()

  prepareSvgDice() {
    this.svgDice = [];
    this.svgDice[0]  = '';
    this.svgDice[1]  = '<svg class="dice-one" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">';
    this.svgDice[1] += '<rect x="7" y="7" rx="30" width="166" height="166" stroke-width="1"/>';
    this.svgDice[1] += '<circle cx="90" cy="90" r="8" stroke-width="18"/>';
    this.svgDice[1] += '</svg>';
    this.svgDice[2]  = '<svg class="dice-two" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">';
    this.svgDice[2] += '<rect x="7" y="7" rx="30" width="166" height="166" stroke-width="1"/>';
    this.svgDice[2] += '<circle cx="50" cy="130" r="8" stroke-width="18"/>';
    this.svgDice[2] += '<circle cx="130" cy="50" r="8" stroke-width="18"/>';
    this.svgDice[2] += '</svg>';
    this.svgDice[3]  = '<svg class="dice-three" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">';
    this.svgDice[3] += '<rect x="7" y="7" rx="30" width="166" height="166" stroke-width="1"/>';
    this.svgDice[3] += '<circle cx="48" cy="132" r="8" stroke-width="18"/>';
    this.svgDice[3] += '<circle cx="90" cy="90" r="8" stroke-width="18"/>';
    this.svgDice[3] += '<circle cx="132" cy="48" r="8" stroke-width="18" />';
    this.svgDice[3] += '</svg>';
    this.svgDice[4]  = '<svg class="dice-four" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">';
    this.svgDice[4] += '<rect x="7" y="7" rx="30" width="166" height="166" stroke-width="1"/>';
    this.svgDice[4] += '<circle cx="48" cy="48" r="8" stroke-width="18"/>';
    this.svgDice[4] += '<circle cx="48" cy="132" r="8" stroke-width="18"/>';
    this.svgDice[4] += '<circle cx="132" cy="48" r="8" stroke-width="18"/>';
    this.svgDice[4] += '<circle cx="132" cy="132" r="8" stroke-width="18"/>';
    this.svgDice[4] += '</svg>';
    this.svgDice[5]  = '<svg class="dice-five" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">';
    this.svgDice[5] += '<rect x="7" y="7" rx="30" width="166" height="166" stroke-width="1"/>';
    this.svgDice[5] += '<circle cx="48" cy="48" r="8" stroke-width="18"/>';
    this.svgDice[5] += '<circle cx="48" cy="132" r="8" stroke-width="18"/>';
    this.svgDice[5] += '<circle cx="90" cy="90" r="8" stroke-width="18"/>';
    this.svgDice[5] += '<circle cx="132" cy="48" r="8" stroke-width="18"/>';
    this.svgDice[5] += '<circle cx="132" cy="132" r="8" stroke-width="18"/>';
    this.svgDice[5] += '</svg>';
    this.svgDice[6]  = '<svg class="dice-six" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">';
    this.svgDice[6] += '<rect x="7" y="7" rx="30" width="166" height="166" stroke-width="1"/>';
    this.svgDice[6] += '<circle cx="48" cy="48" r="8" stroke-width="18"/>';
    this.svgDice[6] += '<circle cx="48" cy="132" r="8" stroke-width="18"/>';
    this.svgDice[6] += '<circle cx="48" cy="90" r="8" stroke-width="18"/>';
    this.svgDice[6] += '<circle cx="132" cy="48" r="8" stroke-width="18"/>';
    this.svgDice[6] += '<circle cx="132" cy="90" r="8" stroke-width="18"/>';
    this.svgDice[6] += '<circle cx="132" cy="132" r="8" stroke-width="18"/>';
    this.svgDice[6] += '</svg>';
  }

  setDomNameAndStyle() {
    let xh;

    //offtray
    xh  = '<div id="offtray" class="offtray"></div>';
    this.mainBoard.append(xh);
    this.offtray = $('#offtray');
    this.offtray.css(this.getPosObjBottom(this.pointX[0], this.offY));

    //point triangles
    this.point = [];
    const pointColorClass = ["pt_dnev", "pt_dnod"];
    for (let i = 1; i <= 6; i++) {
      const colfig = (i % 2); //0=under+even, 1=under+odd
      const xh = '<div id="pt' + i + '" class="point ' + pointColorClass[colfig] + '"></div>';
      this.mainBoard.append(xh);
      this.point[i] = $('#pt' + i);
      this.point[i].css(this.getPosObjBottom(this.pointX[i], this.pointY));
    }
    this.pointAll = $(".point");

    //dice
    xh  = '<div id="dice1" class="dice"></div>';
    xh += '<div id="dice2" class="dice"></div>';
    this.mainBoard.append(xh);
    this.dice1 = $('#dice1');
    this.dice2 = $('#dice2');
    this.dice1.css(this.getPosObjTop(this.dice1X, this.diceY));
    this.dice2.css(this.getPosObjTop(this.dice2X, this.diceY));

    //Chequer
    this.chequer = [];
    for (let i = 0; i < 4; i++) {
      this.chequer[i] = new Chequer(i);
      const xh = this.chequer[i].domhtml;
      this.mainBoard.append(xh);
      this.chequer[i].dom = true;
    }
  }

  makeThumbBoard(ogid) {
    let xh = "";

    //container
    const player = ogid.player;
    const style = this.boardstyle[parseInt(player)];
    xh = '<div class="' + style + '">';

    //offtray
    const style2 = this.obj2style(this.getPosObjBottom(this.thumbPointX[0], this.offY));
    xh += '<div class="thumbofftray" style="' + style2 + '"></div>';

    //point triangles
    const pointColorClass = ["pt_dnev", "pt_dnod"];
    for (let i = 1; i <= 6; i++) {
      const colfig = (i % 2); //0=under+even, 1=under+odd
      const style = this.obj2style(this.getPosObjBottom(this.thumbPointX[i], this.pointY));
      xh += '<div class="thumbpoint ' + pointColorClass[colfig] + '" style="' + style + '"></div>';
    }

    //Chequer
    for (let pt = 0; pt <= 6; pt++) {
      const num = ogid.get_ptno(pt);
      for (let n = 0; n < num; n++) {
        const ex = 6 - pt;
        const ey = (pt == 0) ? (n * this.thumbBoffHeight) : (n * this.thumbPieceHeight);
        const style = this.obj2style(this.getPosObjBottom(this.thumbPointX[pt], ey));
        const boff = (pt==0) ? " bearoff" : "";
        xh += '<div class="thumbchecker turncolor' + boff + '" style="' + style + '"></div>';
      }
    }

    //container close
    xh += '</div>';

    return xh;
  }

  showBoard(ogid) {
    this.ogid = ogid;
    this.showPosition(ogid);
    this.showDice(ogid);
    this.changeAppearance(ogid);
  }

  showDice(ogid) {
    const dicestr = ogid.get_dice();
    const d1 = parseInt(dicestr.substr(0, 1));
    const d2 = parseInt(dicestr.substr(1, 1));
    const dicefaceClass = "diceface";
    this.dice1.html(this.svgDice[d1]).toggle(d1 != 0);
    this.dice2.html(this.svgDice[d2]).toggle(d2 != 0);
    this.dice1.children("svg").addClass(dicefaceClass);
    this.dice2.children("svg").addClass(dicefaceClass);
  }

  showPosition(ogid) {
    let checkerid = 0;
    for (let pt = 0; pt <= 6; pt++) {
      const num = ogid.get_ptno(pt);
      for (let n = 0; n < num; n++) {
        const ex = (pt == 0) ? this.pointX[pt] + this.offtrayMargin : this.pointX[pt];
        const ey = (pt == 0) ? this.ylower - (n * this.boffHeight) : this.ylower - (n * this.pieceHeight);
        const pos = this.getPosObjTop(ex, ey);
        const zindex = 10 + checkerid;
        this.chequer[checkerid].dom.css(pos).css("z-index", zindex);
        this.chequer[checkerid].dom.toggleClass("bearoff", pt==0);
        this.chequer[checkerid].point = pt;
        checkerid += 1;
      }
    }
  }

  changeAppearance(ogid) {
    const player = ogid.get_player();
    const boardstyleall = this.boardstyle.join(" ");
    const boardstyle = this.boardstyle[parseInt(player)];
    this.mainBoard.removeClass(boardstyleall).addClass(boardstyle);
  }

  animateDice(msec) {
    const diceanimclass = "faa-shake animated"; //ダイスを揺らすアニメーション
    this.dice1.addClass(diceanimclass);
    this.dice2.addClass(diceanimclass);

    const defer = $.Deferred(); //deferオブジェクトからpromiseを作る
    setTimeout(() => { //msec秒待ってアニメーションを止める
      this.dice1.removeClass(diceanimclass);
      this.dice2.removeClass(diceanimclass);
      defer.resolve();
    }, msec);

    return defer.promise();
  }

  bgBoardConfig() {
    //CSSで定義された数値情報を取得
    const style = getComputedStyle(document.documentElement);
    const boardWidth4Num   = parseFloat(style.getPropertyValue('--boardWidth4Num'));
    const boardWidth8Num   = parseFloat(style.getPropertyValue('--boardWidth8Num'));
    const offtrayMarginNum = parseFloat(style.getPropertyValue('--offtrayMarginNum'));

    //ボード表示のための位置と大きさの定数を計算
    this.mainBoardHeight = this.mainBoard.height(); //使わない
    this.mainBoardWidth  = this.mainBoard.width();

    //サムネイルボードの大きさの定数を計算
    this.thumbBoardHeight = $("#thumbnail0").height();
    this.thumbBoardWidth  = $("#thumbnail0").width();

    this.pointWidth = this.mainBoardWidth * 0.99 / 7; //ポイントの幅を計算
    this.pieceWidth = window.innerWidth *  (boardWidth8Num / 100) / 7; //チェッカーは大きさを変えない
    this.pieceHeight = this.pieceWidth;
    this.boffHeight = this.pieceWidth * 0.4;  //ベアオフの駒は立てたように表示
    this.offtrayMargin = offtrayMarginNum;
    this.offY = 0;

    this.thumbPointWidth = this.thumbBoardWidth * 0.99 / 7;
    this.thumbPieceWidth = this.thumbPointWidth;
    this.thumbPieceHeight = this.thumbPieceWidth;
    this.thumbBoffHeight = this.thumbPieceWidth * 0.4;

    this.pointY = 0;
    this.pointX = [];
    this.thumbPointX = [];
    for (let n = 0; n <= 6; n++) {
      const px = 6 - n;
      this.pointX[n]      = px * this.pointWidth;
      this.thumbPointX[n] = px * this.thumbPointWidth;
    }

    this.ylower = this.mainBoardHeight - this.pieceHeight; //一番下のコマ位置Y

    this.diceY = this.mainBoardHeight * 0.15;
    this.dice1X = this.pointX[2];
    this.dice2X = this.pointX[4];
  }

  getPosObjTop(x, y) {
    return {left:x, top:y}
  }

  getPosObjBottom(x, y) {
    return {left:x, bottom:y}
  }

  obj2style(obj) {
    const left = parseFloat(obj.left);
    const top = parseFloat(obj.top);
    const bottom = parseFloat(obj.bottom);
    let style = "";
    style += (isNaN(left)) ?   "" : "left:"   + left   + "px;";
    style += (isNaN(top)) ?    "" : "top:"    + top    + "px;";
    style += (isNaN(bottom)) ? "" : "bottom:" + bottom + "px;";
    return style;
  }

  getDragEndPoint(pos) {
    const px = Math.floor(pos.left / this.pointWidth + 0.5);
    const pt = 6 - px;
    return pt;
  }

  getDragStartPoint(id) {
    const chker = this.chequer.find(elem => elem.domid == id);
    const pt = chker.point;
    return pt;
  }

  getChequerOnDragging(pt) {
    const aryreverse = this.chequer.reverse();
    const chker = aryreverse.find(elem => elem.point == pt); //一番上の(最後の)チェッカーを返す
    return chker;
  }

  flashOnMovablePoint(destpt) {
    for (const dp of destpt) {
      if (dp == 0) { this.offtray.toggleClass("flash", true); }
      else { this.point[dp].toggleClass("flash", true); }
    }
  }

  flashOffMovablePoint() {
    this.pointAll.removeClass("flash");
    this.offtray.removeClass("flash");
  }

  redraw() {
    this.bgBoardConfig();

    //offtray
    this.offtray.css(this.getPosObjBottom(this.pointX[0], this.offY));
    //point triangles
    for (let i = 1; i <= 6; i++) {
      this.point[i].css(this.getPosObjBottom(this.pointX[i], this.pointY));
    }
    //dice
    this.dice1.css(this.getPosObjTop(this.dice1X, this.diceY));
    this.dice2.css(this.getPosObjTop(this.dice2X, this.diceY));

    this.showBoard(this.ogid);
  }

} //class BgBoard
