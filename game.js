AFRAME.registerComponent("game-play", {
    schema: {
      elementId: { type: "string", default: "#coin1" },      
    },
    
    update: function() {
      this.isCollided(this.data.elementId);
    },

    init: function() {
      var duration = 120;
      const timerEl = document.querySelector("#timer");
      this.startTimer(duration, timerEl);
    },

    startTimer: function(duration, timerEl) {
      var minutes;
      var seconds;

      var timer = setInterval(countDown, 1000);

      function countDown() {
        if (duration >= 0) {
          minutes = parseInt(duration / 60);
          seconds = parseInt(duration % 60);

          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          if (seconds < 10) {
            seconds = "0" + seconds;
          }

          timerEl.setAttribute("text", {
            value: minutes + ":" + seconds,
          });

          duration -= 1;
        } 
        else if (duration == 0) {
          //clearInterval(timer);
          this.gameOver();
        }
      }
    },
  
    isCollided: function(elementId) {
      const element = document.querySelector(elementId);
      element.addEventListener("collide", e => {
        if (elementId.includes("#coin")) {          
          element.setAttribute("visible", false);
          this.updateScore();
          this.updateTargets();
        }
        else{
          this.gameOver();
        }         
      });
    },
    
    updateScore: function() {
      const scoreEl = document.querySelector("#score");
      const score = scoreEl.getAttribute("text").value;
      scoreEl.setAttribute("text", {
        value: parseInt(score) + 50
      });
    },

    updateTargets: function() {
      const targetsEl = document.querySelector("#targetStatus");
      const targets = targetsEl.getAttribute("text").value;
      targetsEl.setAttribute("text", {
        value: parseInt(targets) - 1
      });
    },

    gameOver: function() {
      var diverEl = document.querySelector("#scuba-diver");
      var gameOverEl = document.querySelector("#game-over");
      gameOverEl.setAttribute("visible", true);
      diverEl.setAttribute("dynamic-body", { mass: 1 });
    }
  });
  