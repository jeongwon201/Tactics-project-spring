//전역 변수 -------------------------------------------------------------------------------------------
var sceneList = new Array();
var sceneJson;

var ph_num = 1;
var pa_num = 1;

var scene_num = 1; // 총 씬 개수
var scene_cur = 1; // 현재 씬 위치

// init ---------------------------------------------------------------------------------------------
sceneList.push($(".player-container").html().toString());

// function -----------------------------------------------------------------------------------------
var sceneAdd = function() {
	sceneList.push($(".player-container").html().toString());
}

var sceneReplace = function() {
	$(".clone").remove();
	sceneList.splice((scene_cur) - 1, 1, $(".player-container").html().toString());
}

var sceneDelete = function() {
	sceneList.splice(scene_num, 1);
	scene_num--;
}

var findCur = function() {
	var cur_radio = $("input:radio[name='scene']:checked").val();
	scene_cur = cur_radio;

	$(".btn-container").html("<h5>장면 추가 시 선수를 추가/생성할 수 없습니다.</h4>");
}

var cloneIdChange = function() {
	for (i = 1; i < (ph_num + 1); i++) {
		$("#ph" + i + "-" + (scene_num - 1)).attr('id', 'phc' + i);
	}
	for (i = 1; i < (pa_num + 1); i++) {
		$("#pa" + i + "-" + (scene_num - 1)).attr('id', 'pac' + i);
	}
	$("#ball-" + (scene_num - 1)).attr('id', 'ballc');
}

var originalIdChange = function() {
	for (i = 1; i < (ph_num) + 1; i++) {
		$("#ph" + i + "-" + (scene_num - 1)).attr('id', 'ph' + i + "-" + scene_num);
	}
	for (i = 1; i < (pa_num) + 1; i++) {
		$("#pa" + i + "-" + (scene_num - 1)).attr('id', 'pa' + i + "-" + scene_num);
	}
	$("#ball-" + (scene_num - 1)).attr('id', 'ball-' + scene_num);
}

var radioCheck = function() {
	$(".scene-label").removeClass("active");
	$("#label" + scene_cur).addClass("active");
}

var play = function() {
	var strSceneList = "";

	var x = null;
	var y = null;

	var cur = 1;

	for (i = 0; i < sceneList.length; i++) {
		strSceneList += (sceneList[i]);
	}
	$(".player-container").html(strSceneList);
	$(".player").hide();

	for (i = 1; i < ph_num + 1; i++) {
		$("#ph" + i + "-1").show();
	}
	for (i = 1; i < pa_num + 1; i++) {
		$("#pa" + i + "-1").show();
	}
	$("#ball-1").show();

	for (i = 1; i < scene_num + 1; i++) {
		(function(x) {
			for (j = 1; j < ph_num + 1; j++) {
				x = $("#ph" + j + "-" + (i + 1)).css("left");
				y = $("#ph" + j + "-" + (i + 1)).css("top");
				$("#ph" + j + "-" + 1).animate({ left: x, top: y }, 1500, 'linear');
			}
			for (j = 1; j < pa_num + 1; j++) {
				x = $("#pa" + j + "-" + (i + 1)).css("left");
				y = $("#pa" + j + "-" + (i + 1)).css("top");
				$("#pa" + j + "-" + 1).animate({ left: x, top: y }, 1500, 'linear');
			}
			x = $("#ball-" + (i + 1)).css("left");
			y = $("#ball-" + (i + 1)).css("top");
			$("#ball-" + 1).animate({ left: x, top: y }, 1500, 'linear');

			setTimeout(function() {
				cur++;
				if (cur == (scene_num + 1)) {
					playAfter();
				}
			}, 1500 * i)
		})(i);
	}
}

var playAfter = function() {
	$('.player').remove();
	if (scene_cur == 1) {
		$('.player-container').html(sceneList[(scene_cur) - 1]);
	} else {
		$('.player-container').html(sceneList[(scene_cur) - 1]);
		var originalPlayer = $(".player").clone();
		$('.player-container').html(sceneList[(scene_cur) - 2]);
		$('.player').addClass('clone');
		cloneIdChange();
		originalPlayer.appendTo('.player-container');
	}
}

//---------------------------------------------------------------------------------------------------

// 선수, 공 DND
window.addEventListener("load", function() {
	var section = document.querySelector("#main");

	var container = section.querySelector(".player-container");

	var dragging = false;
	var offset = { x: 0, y: 0 };
	var current = null;
	var left = container.offsetLeft;
	var top = container.offsetTop;

	section.onmousedown = function(e) {
		if (e.target.classList.contains("clone")) {
			return;
		} else {
			if (e.target.classList.contains("player", "ball")) {
				dragging = true;
				current = e.target;
				offset.x = e.offsetX;
				offset.y = e.offsetY;

				leftX = e.target.style.left;
				topY = e.target.style.top;
			}
		}
	}

	section.onmousemove = function(e) {
		if (!dragging) return;

		var x = e.pageX - offset.x - left - 70;
		var y = e.pageY - offset.y - top - 190;

		current.style.left = x + "px"; // 단위를 사용해야만 적용됨
		current.style.top = y + "px";
	}

	section.onmouseup = function(e) {
		dragging = false;
	}
});

//선수 추가 및 삭제
window.addEventListener("load", function() {
	//home 선수 추가, 삭제
	$(".home-add").click(function() {
		ph_num++;
		$(".player-container").append("<div id='ph" + ph_num + "-1' class='player home'>" + ph_num + "</div>");
	});

	$(".home-delete").click(function() {
		if (ph_num <= 0) {
			return;
		} else {
			if (scene_cur == 1) {
				$("#ph" + ph_num + "-1").remove();
				ph_num--;
			}
		}
	});

	//away 선수 추가 삭제
	$(".away-add").click(function() {
		pa_num++;
		$(".player-container").append("<div id='pa" + pa_num + "-1' class='player away'>" + pa_num + "</div>");
	});

	$(".away-delete").click(function() {
		if (pa_num <= 0) {
			return;
		} else {
			if (scene_cur == 1) {
				$("#pa" + pa_num + "-1").remove();
				pa_num--;
			}
		}
	});
});

//씬 추가 및 삭제
window.addEventListener("load", function() {
	$(".add-scene").click(function() {
		sceneReplace();
		sceneAdd();
		scene_num++;

		$(".scene-container").append("<label class='btn btn-success scene-label' id='label" + scene_num + "'><input type='radio' id=scene" + scene_num + " name='scene' class='scene-radio' value='" + scene_num + "' checked>" + scene_num + "</label>");
		findCur();
		radioCheck();
		// 씬 추가 시 이전 씬의 선수 반투명 처리
		$(".player-container").html(sceneList[(scene_cur) - 2]);
		var originalPlayer = $('.player').clone();
		$(".player").addClass('clone');
		cloneIdChange();
		originalPlayer.appendTo('.player-container');
		originalIdChange();
	});

	$(".delete-scene").click(function() {
		if (scene_num <= 1) {
			return;
		} else if (scene_cur == scene_num) {
			$("#label" + scene_num).remove();
			sceneDelete();
			$("#scene" + scene_num).prop("checked", true);
			findCur();
			radioCheck();
			if (scene_cur == 1) {
				$('.player-container').html(sceneList[(scene_cur) - 1]);
			} else {
				$('.player-container').html(sceneList[(scene_cur) - 1]);
				var originalPlayer = $(".player").clone();
				$('.player-container').html(sceneList[(scene_cur) - 2]);
				$('.player').addClass('clone');
				cloneIdChange();
				originalPlayer.appendTo('.player-container');
			}

		} else {
			$("#label" + scene_num).remove();
			sceneDelete();
		}
	});
});

// 씬 전환
window.addEventListener("load", function() {
	var sc = document.querySelector(".scene-container");

	sc.onclick = function(e) {
		if (e.target.name == "scene") {
			var oneClick = true;
			if (oneClick) {
				oneClick = false;
				sceneReplace();

				$('.player').remove();
				findCur();
				radioCheck();
				if (scene_cur == 1) {
					$('.player-container').html(sceneList[(scene_cur) - 1]);
				} else {
					$('.player-container').html(sceneList[(scene_cur) - 1]);
					var originalPlayer = $(".player").clone();
					$('.player-container').html(sceneList[(scene_cur) - 2]);
					$('.player').addClass('clone');
					cloneIdChange();
					originalPlayer.appendTo('.player-container');
				}
			} else {
				return;
			}
		} else {
			return;
		}
	};
});

//전술 재생, 일시정시, 정지
window.addEventListener("load", function() {
	var btnPlay = document.querySelector("#btn-play");
	var btnPause = document.querySelector("#btn-pause");
	var btnStop = document.querySelector("#btn-stop");

	btnPlay.onclick = function(e) {
		sceneReplace();
		play();
	};

	btnPause.onclick = function(e) {
		for (i = 1; i < (ph_num + 1); i++) {
			$("#ph" + i + "-1").stop(true, false);
		}
	};

	btnStop.onclick = function() {
		for (i = 1; i < (ph_num + 1); i++) {
			$("#ph" + i + "-1").clearQueue();
		}
	};
});

//불러오기
window.addEventListener("load", function() {
	var btnLoad = document.querySelector("#btn-load");
	
	btnLoad.onclick = function() {
		
	}
});

//저장 및 초기화
window.addEventListener("load", function() {
	var sc = document.querySelector(".save-container");
	var btnSave = sc.querySelector("#btn-save")
	var btnReset = sc.querySelector("#btn-reset")
	btnSave.onclick = function() {
		sceneJson = JSON.stringify(sceneList);
		var textSaveName = $("#text-save-name").val();
		alert(textSaveName);
		
		$.ajax({
			type: "POST",
			data: {sceneJson : sceneJson, textSaveName : textSaveName},
			url: "tacticsSave",
			success: function(data) {
				alert("SUCCESS" + data);
			},
			error: function() {
				alert("ERROR");
			}
		});
	};

	btnReset.onclick = function(e) {
		window.location.reload();
	};
});