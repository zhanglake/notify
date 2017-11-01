(function() {
  var $ = jQuery;

  $.bootstrapGrowl = function(message, options) {
      var $alert, css, offsetAmount;
      options = $.extend({}, $.bootstrapGrowl.default_options, options);
      $alert = $("<div>");
      $alert.attr("class", "bootstrap-growl alert");
      if (options.type) {
          $alert.addClass("alert-" + options.type);
          var $i = $("<i>");
          var type_bgcolor = "#4093ff", type_class = "glyphicon glyphicon-info-sign";
          if (options.type === 'success') {
              type_bgcolor = "#1ab394";
              type_class = "glyphicon glyphicon-ok-circle";
          } else if (options.type === 'danger') {
              type_bgcolor = "#fa5555";
              type_class = "glyphicon glyphicon-remove-circle";
          } else if (options.type === 'warning') {
              type_bgcolor = "#eb9e05";
              type_class = "glyphicon glyphicon-exclamation-sign";
          }
          $i.addClass(type_class);
          var type_css = {
              'color': '#ffffff',
              'background-color': type_bgcolor,
              'width': '51px',
              'height': '52px',
              'font-size': '26px',
              'position': 'absolute',
              'top': '-1px',
              'left': '0px',
              'padding': '14px 0 0 12px'
          }
          $i.css(type_css);
      }
      $alert.append($i);
      if (options.allow_dismiss) {
          $alert.addClass("alert-dismissible");
          $alert.append("<button  class=\"close\" data-dismiss=\"alert\" type=\"button\"><span aria-hidden=\"true\">&#215;</span><span class=\"sr-only\">Close</span></button>");
      }
      $alert.append(message);
      if (options.top_offset) {
          options.offset = {
              from: "top",
              amount: options.top_offset
          };
      }
      offsetAmount = options.offset.amount;
      $(".bootstrap-growl").each(function() {
          return offsetAmount = Math.max(offsetAmount, parseInt($(this).css(options.offset.from)) + $(this).outerHeight() + options.stackup_spacing);
      });
      css = {
          "position": (options.ele === "body" ? "fixed" : "absolute"),
          "margin": 0,
          "z-index": "9999",
          "display": "none",
          "background-color": "#ffffff",
          "line-height": "21px",
          "padding-left": "60px"
      };
      css[options.offset.from] = offsetAmount + "px";
      $alert.css(css);
      if (options.width !== "auto") {
          $alert.css("width", options.width + "px");
      }
      $(options.ele).append($alert);
      switch (options.align) {
          case "center":
              $alert.css({
                  "left": "50%",
                  "margin-left": "-" + ($alert.outerWidth() / 2) + "px"
              });
              break;
          case "left":
              $alert.css("left", "20px");
              break;
          default:
              $alert.css("right", "20px");
      }
      $alert.fadeIn();
      if (options.type !== "danger") {
          if (options.delay > 0) {
              $alert.delay(options.delay).fadeOut(function () {
                  return $(this).alert("close");
              });
          }
      }
      return $alert;
  };

  $.bootstrapGrowl.default_options = {
      ele: "body",
      type: "info",
      offset: {
          from: "top",
          amount: 20
      },
      align: "right",
      width: 250,
      delay: 4000,
      allow_dismiss: true,
      stackup_spacing: 10
  };

}).call(this);