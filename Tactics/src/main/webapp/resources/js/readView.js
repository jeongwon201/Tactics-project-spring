var ph_num = 1;
var pa_num = 1;
var scene_num = 1;

$(document).ready(function() {
	//전술 불러오기
	
	var tno = $("#tno").val();
	$.ajax({
		url: 'readViewTactics',
		type: 'post',
		data: {tno : tno},
		success: function(data) {
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
			
			$('.player-container').html(sceneList[0].scene);
		},
		error: function() {
			alert('AJAX ERROR');
		}
	});
	
	
	var btnPlay = document.querySelector("#btn-play");
	btnPlay.onclick = function() {
		play();
	};
	
	
	var formObj = $("form[name='readForm']");
	// 수정 
	$(".update_btn").on("click", function() {
		formObj.attr("action", "/board/updateView");
		formObj.attr("method", "get");
		formObj.submit();
	})

	// 삭제
	$(".delete_btn").on("click", function() {

		var deleteYN = confirm("삭제하시겠습니까?");
		if (deleteYN == true) {

			formObj.attr("action", "/board/delete");
			formObj.attr("method", "post");
			formObj.submit();

		}
	})

	var scriBno = $("#bno").val();
	var scriPage = $("#page").val();
	var scriPerPageNum = $("#perPageNum").val();
	var scriSearchType = $("#searchType").val();
	var scriKeyword = $("#keyword").val();
	// 목록
	$(".list_btn").on("click", function() {
		
		location.href = "/board/list?page=" + scriPage + "&perPageNum=" + scriPerPageNum + "&searchType=" + scriSearchType + "&keyword=" + scriKeyword;
	})

	$(".replyWriteBtn").on("click", function() {
		var formObj = $("form[name='replyForm']");
		formObj.attr("action", "/board/replyWrite");
		formObj.submit();
	});

	//댓글 수정 View
	$(".replyUpdateBtn").on("click", function() {
		location.href = "/board/replyUpdateView?bno="+ scriBno
		 + "&page=" + scriPage
		 + "&perPageNum=" + scriPerPageNum
		 + "&searchType=" + scriSearchType
		 + "&keyword=" + scriKeyword
		 + "&rno=" + $(this).attr("data-rno");
	});

	//댓글 삭제 View
	$(".replyDeleteBtn").on("click", function() {
		location.href = "/board/replyDeleteView?bno=" + scriBno
			+ "&page=" + scriPage
			+ "&perPageNum=" + scriPerPageNum
			+ "&searchType=" + scriSearchType
			+ "&keyword=" + scriKeyword
			+ "&rno=" + $(this).attr("data-rno");
	});
})

// 플레이 기능
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
	$('.player-container').html(sceneList[0].scene);
}