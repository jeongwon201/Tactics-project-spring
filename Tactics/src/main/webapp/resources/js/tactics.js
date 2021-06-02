//전역 변수 -------------------------------------------------------------------------------------------
var sceneList = new Array();
var sceneJson;

var ph_num = 1;
var pa_num = 1;

var scene_num = 1; // 총 씬 개수
var scene_cur = 1; // 현재 씬 위치

// init ---------------------------------------------------------------------------------------------
var sceneObjInit = new Object();
sceneObjInit.sceneNum = scene_cur;
sceneObjInit.scene = $(".player-container").html().toString();
sceneList.push(sceneObjInit);

// function -----------------------------------------------------------------------------------------
var sceneAdd = function() {
	var sceneObj = new Object();
	sceneObj.sceneNum = scene_num;
	sceneObj.scene = $(".player-container").html().toString();
	sceneList.push(sceneObj);
}

var sceneReplace = function() {
	var sceneObj = new Object();
	$(".clone").remove();
	sceneObj.sceneNum = scene_cur;
	sceneObj.scene = $(".player-container").html().toString();
	sceneList.splice((scene_cur) - 1, 1, sceneObj);
}

var sceneDelete = function() {
	sceneList.splice(scene_num, 1);
	scene_num--;
}

var findCur = function() {
	var cur_radio = $("input:radio[name='scene']:checked").val();
	scene_cur = cur_radio;
}

var radioCheck = function() {
	$(".scene-label").removeClass("active");
	$("#label" + scene_cur).addClass("active");
}

var cloneIdChange = function() {
	for (i = 1; i < (ph_num + 1); i++) {
		$("#ph" + i + "-" + (scene_cur - 1)).attr('id', 'phc' + i);
	}
	for (i = 1; i < (pa_num + 1); i++) {
		$("#pa" + i + "-" + (scene_cur - 1)).attr('id', 'pac' + i);
	}
	$("#ball-" + (scene_cur - 1)).attr('id', 'ballc');
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

var play = function() {
	var strSceneList = "";

	var x = null;
	var y = null;

	var cur = 1;

	for (i = 0; i < sceneList.length; i++) {
		strSceneList += (sceneList[i].scene);
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
		(function() {
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
		$('.player-container').html(sceneList[(scene_cur) - 1].scene);
	} else {
		$('.player-container').html(sceneList[(scene_cur) - 1].scene);
		var originalPlayer = $(".player").clone();
		$('.player-container').html(sceneList[(scene_cur) - 2].scene);
		$('.player').addClass('clone');
		cloneIdChange();
		originalPlayer.appendTo('.player-container');
	}
}

//---------------------------------------------------------------------------------------------------

// 선수, 공 DND
window.addEventListener("load", function() {
	var section = document.querySelector("#section");

	var container = section.querySelector(".player-container");
	
	var dragging = false;
	var offset = {x:0, y:0};
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
			}
		}
	}

	section.onmousemove = function(e) {
		if (!dragging) return;

		var x = e.pageX - offset.x - left;
		var y = e.pageY - offset.y - top;

		current.style.left = x + "px"; // 단위를 사용해야만 적용됨
		current.style.top = y + "px";
		
		console.log(x + ", " + y);
	}

	section.onmouseup = function() {
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
		if(scene_num == 1) {
		$(".btn-container").html("<h5>장면 추가 시 선수를 추가/생성할 수 없습니다.</h4>");
		}
			
		sceneReplace();
		scene_num++;
		sceneAdd();

		$(".scene-container").append("<label class='btn btn-success scene-label' id='label" + scene_num + "'><input type='radio' id=scene" + scene_num + " name='scene' class='scene-radio' value='" + scene_num + "' checked>" + scene_num + "</label>");
		findCur();
		radioCheck();
		// 씬 추가 시 이전 씬의 선수 반투명 처리
		$(".player-container").html(sceneList[(scene_cur) - 2].scene);
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
				$('.player-container').html(sceneList[(scene_cur) - 1].scene);
			} else {
				$('.player-container').html(sceneList[(scene_cur) - 1].scene);
				var originalPlayer = $('.player').clone();
				$('.player-container').html(sceneList[(scene_cur) - 2].scene);
				$('.player').addClass('clone');
				cloneIdChange();
				$('.player-container').append(originalPlayer);
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
					$('.player-container').html(sceneList[0].scene);
				} else {
					$('.player-container').html(sceneList[(scene_cur) - 1].scene);
					var originalPlayer = $('.player').clone();
					$('.player-container').html(sceneList[(scene_cur) - 2].scene);
					$('.player').addClass('clone');
					cloneIdChange();
					$('.player-container').append(originalPlayer);
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

	btnPlay.onclick = function() {
		sceneReplace();
		play();
	};

	btnPause.onclick = function() {
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

//불러오기, 삭제
window.addEventListener("load", function() {
	var btnLoad = document.querySelector("#btn-load");
	var btnDelete = document.querySelector("#btn-delete");
	
	// 불러오기
	btnLoad.onclick = function() {
		var selected = $("#select-tactics option:selected").val();
		
		if(selected == '전술을 선택하세요.') {
			alert('불러올 전술을 선택하세요.');
			return false;
		} else {
			$.ajax({
				type: "POST",
				data: {title : selected},
				url: "tacticsLoad",
				success: function(data) {
					alert('불러오기 완료');
					
					var jsonData = JSON.parse(data);
					sceneList = [];
					for(i=0; i<jsonData.length -1; i++) {
						var sceneObj = new Object();
						sceneObj.sceneNum = i+1;
						sceneObj.scene = jsonData[i].scene;
						sceneList.push(sceneObj);
					}
					ph_num = jsonData[jsonData.length -1].ph_num;
					pa_num = jsonData[jsonData.length -1].pa_num;
					scene_num = jsonData[jsonData.length -1].scene_num;
					scene_cur = jsonData[jsonData.length -1].scene_num;
					
					$('.scene-label').remove();
					for(i=0; i<scene_num; i++) {
						$(".scene-container").append("<label class='btn btn-success scene-label' id='label" + (i+1) + "'><input type='radio' id=scene" + (i+1) + " name='scene' class='scene-radio' value='" + (i+1) + "' checked>" + (i+1) + "</label>");
					}
					radioCheck();
					
					$('.player').remove();
					$('.player-container').html(sceneList[(scene_num) - 1].scene);
					var originalPlayer = $('.player').clone();
					$('.player-container').html(sceneList[(scene_num) - 2].scene);
					$('.player').addClass('clone');
					cloneIdChange();
					$('.player-container').append(originalPlayer);
					
					$("#text-save-name").val(selected);
					
					if(scene_num == 1) {
						$(".btn-container").html("<h5>장면 추가 시 선수를 추가/생성할 수 없습니다.</h4>");
					}
				},
				error: function() {
					alert("AJAX ERROR, 관리자에게 문의하세요.");
				}
			});
		}
	}
	
	// 삭제
	btnDelete.onclick = function() {
		var selected = $("#select-tactics option:selected").val();
		
		if(selected == '전술을 선택하세요.') {
			alert('삭제할 전술을 선택하세요.');
			return false;
		} else {
			$.ajax({
				type: "POST",
				data: {title : selected},
				url: "tacticsDelete",
				success: function(result) {
					if(result == 1) {
						alert('삭제 완료');
					} else {
						alert('삭제 실패, 관리자에게 문의하세요.');
					}
					window.location.reload();
				},
				error: function() {
					alert("AJAX ERROR, 관리자에게 문의하세요.");
				}
			});
		}
	}
});

//저장 및 초기화
window.addEventListener("load", function() {
	var sc = document.querySelector(".save-container");
	var btnSave = sc.querySelector("#btn-save")
	var btnReset = sc.querySelector("#btn-reset")
	btnSave.onclick = function() {
		sceneReplace();
		
		var sceneObj = new Object();
		sceneObj.ph_num = ph_num;
		sceneObj.pa_num = pa_num;
		sceneObj.scene_num = scene_num;
		
		sceneList.push(sceneObj);
		
		sceneJson = JSON.stringify(sceneList);
		var textSaveName = $("#text-save-name").val();
		
		$.ajax({
			type: "POST",
			data: {sceneJson : sceneJson, textSaveName : textSaveName},
			url: "tacticsSave",
			success: function(data) {
				if(data == 1) {
					alert("저장 성공");
				} else {
					alert("ERROR, 관리자에게 문의하세요.")
				}
				window.location.reload();
			},
			error: function() {
				alert("AJAX ERROR, 관리자에게 문의하세요.");
			}
		});
	};

	btnReset.onclick = function(e) {
		window.location.reload();
	};
});