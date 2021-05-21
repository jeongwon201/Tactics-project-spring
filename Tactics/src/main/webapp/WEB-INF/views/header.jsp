<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<script type="text/javascript">
	$(document).ready(function() {
		$("#logoutBtn").on("click", function() {
			location.href = "../member/logout";
		})

		$("#memberUpdateBtn").on("click", function() {
			location.href = "../member/memberUpdateView";
		})

	})
</script>

<header class="navbar bg-success">
		<div class="container">
		
			<div id="navbar-header">
				<a class="navbar-brand" href="/">TACTICS</a>
			</div>
			
			<div id="navbar" class="collapse navbar-collapse">
				<ul class="nav navbar-nav">
					<li><a href="/tactics/tactics">전술 만들기</a></li>
					<li><a href="/board/list">전술 게시판</a></li>
					<li><a href="/datahouse/list">데이터하우스</a></li>
				</ul>

				<form class="navbar-form navbar-right" name='homeForm' method="post" action="/member/login">
					<c:if test="${member == null}">
						<div class="form-group">
							<input type="text" id="l_userId" name="userId" class="form-control" placeholder="ID">
						</div>
						<div class="form-group">
							<input type="password" id="l_userPw" name="userPw" class="form-control" placeholder="PW">
						</div>
						<div class="form-group">
							<button type="submit" class="btn btn-success">로그인</button>
						</div>
					</c:if>
					<c:if test="${member != null }">
						<div class="form-group">
							${member.userId}님 환영 합니다. &nbsp;&nbsp;
							<button  id="memberUpdateBtn" class="btn btn-success" type="button">내 정보</button>
							<button id="logoutBtn" class="btn btn-danger" type="button">로그아웃</button>
						</div>
					</c:if>
					<c:if test="${msg == false}">
						<p style="color: red;">로그인 실패! 아이디와 비밀번호 확인해주세요.</p>
					</c:if>
				</form>
			</div>
			
		</div>
	</header>