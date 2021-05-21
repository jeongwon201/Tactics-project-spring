<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page language="java" pageEncoding="UTF-8"
	contentType="text/html; charset=UTF-8"%>

<html>
<head>
	<title>Home</title>
	<%@ include file="/resources/include/head.jsp" %>
</head>

<body>
	<%@ include file="header.jsp" %>
	
	<main>
		<div class="container">
			<div class="jumbotron">
				<h1 class="">나만의 전술</h1>
				<p class="lead">
					나만의 전술을 만들어 다른 유저에게 소개해보세요! <br />
					유저들은 당신이 제작한 전술을 평가할 것입니다. <br />
					당신이 만든 전술이 엉터리 전술인지, 완벽한 전술인지 <br />
					한번 평가해보세요!
				</p>
				<p>
					<c:choose>
						<c:when test="${member.userId == null}">
							<a class="btn btn-lg btn-success" href="member/register" role="button">회원 가입하기</a>
						</c:when>
						<c:otherwise>
							<a class="btn btn-lg btn-success" href="tactics/tactics" role="button">전술 만들기</a>
						</c:otherwise>
					</c:choose>
				</p>
			</div>
		</div>	
	</main>
	
	<%@ include file="footer.jsp" %>
</body>
</html>