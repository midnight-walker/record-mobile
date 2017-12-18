module.exports = {
  switchPage: function (num) {
    this.setData({
      showPage: num
    });
  },
  switchPage1: function (num) {
    this.switchPage(1);
  },
  switchPage2: function (num) {
    this.switchPage(2);
  },
  switchPage3: function (num) {
    this.switchPage(3);
  },
  switchPage4: function (num) {
    this.switchPage(4);
  },
  switchPage5: function (num) {
    this.switchPage(5);
  }
}