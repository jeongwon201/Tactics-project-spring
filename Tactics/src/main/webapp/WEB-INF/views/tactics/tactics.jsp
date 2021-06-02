<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page language="java" pageEncoding="UTF-8"
	contentType="text/html; charset=UTF-8"%>

<html>
<head>
<title>Tactics</title>
<%@ include file="/resources/include/head.jsp"%>
<link href="/resources/css/tactics.css?after" rel="stylesheet"
	type="text/css">
</head>

<body>
	<%@ include file="../header.jsp"%>
	
	<section id="section" class="container">
		<div class="row">
			<div class="col-md-12">
				<hr />
			</div>
			
			<div class="col-md-12">
				<div class="play-container col-md-2 text-center">
					<button id="btn-play" class="btn btn-default">
						<span class="glyphicon glyphicon-play"></span>
					</button>
					<button id="btn-pause" class="btn btn-default">
						<span class="glyphicon glyphicon-pause"></span>
					</button>
					<button id="btn-stop" class="btn btn-default">
						<span class="glyphicon glyphicon-stop"></span>
					</button>
				</div>
				<div class="load-container col-md-5 text-center form-inline">
					<select id="select-tactics" class="form-control">
						<option id="select-default" selected="selected">전술을 선택하세요.</option>
						<c:forEach items="${tacticsList}" var="tacticsList">
							<option value="${tacticsList.title}">${tacticsList.title}</option>
						</c:forEach>
					</select>
					<button id="btn-load" class="btn btn-success">불러오기</button>
					<button id="btn-delete" class="btn btn-danger">삭제</button>
				</div>
				
				<div class="save-container col-md-5 text-center form-inline">
					<input type="text" id="text-save-name" class="form-control" placeholder="전술 이름을 입력해주세요." value="">
					<button id="btn-save" class="btn btn-success">저장</button>
					<button id="btn-reset" class="btn btn-danger">초기화</button>
				</div>
			</div>

			<div class="col-md-12">
				<hr />
			</div>
			<div>
				<div class="player-container">
					<div id="ball-1" class="ball player"></div>
					<div id="ph1-1" class="player home">1</div>
					<div id="pa1-1" class="player away">1</div>
				</div>
			</div>
			<div class="col-md-12">
				<hr />
				<div class="btn-container col-md-4 text-center">
					<div class="player-btn-container-home col-md-6 text-center">
						<button class="home-add btn btn-primary">추가</button>
						<button class="home-delete btn btn-primary">삭제</button>
					</div>

					<div class="player-btn-container-away col-md-6 text-center">
						<button class="away-add btn btn-danger">추가</button>
						<button class="away-delete btn btn-danger">삭제</button>
					</div>
				</div>

				<div class="scene-container scene col-md-6 text-center btn-group btn-group-toggle" data-toggle="buttons">
					<label class="btn btn-success active scene-label" id="label1">
						<input type="radio" id="scene1" name="scene" class="scene-radio" value="1" checked>1
					</label>
				</div>
				<div class="scene-ctrl-container col-md-2 text-center">
					<button class="add-scene btn btn-default">+</button>
					<button class="delete-scene btn btn-default">-</button>
				</div>

			</div>
		</div>
		<div class="col-md-12">
			<hr />
		</div>
	</section>
	<%@ include file="../footer.jsp"%>
	<script src="/resources/js/tactics.js"></script>
</body>
</html>