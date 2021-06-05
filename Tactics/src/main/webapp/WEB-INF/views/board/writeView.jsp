<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
	<head>
	 	<title>게시판</title>
		<%@ include file="/resources/include/head.jsp" %>
	</head>
	
	<body>
	
		<%@include file="../header.jsp" %>
	
	
			<section id="container" class="container">
			
			<%@include file="nav.jsp" %>
				
				<div class="col-md-12">
					<label for="tactics" class="control-label">내 전술</label>
					<select id="select-tactics" class="form-control">
						<option id="select-default" selected="selected">전술을 선택하세요.</option>
						<c:forEach items="${tacticsList}" var="tacticsList">
							<option value="${tacticsList.title}">${tacticsList.title}</option>
						</c:forEach>
					</select>
				</div>
				<div class="col-md-12">
					<form role="form" id="writeForm" name="writeForm" class="form-horizontal">
						<c:if test="${member.userId != null}">
							<div>
								<label for="title" class="control-label">제목</label>
								<input type="text" id="title" name="title" class="chk form-control" placeholder="제목을 입력하세요."/>
							</div>
							<div>
								<label for="content" class="control-label">내용</label>
								<textarea id="content" name="content" class="chk form-control" placeholder="내용을 입력하세요."></textarea>
							</div>
							<div>
								<br/>
								<button type="button" class="write_btn btn btn-success" onclick="btnSubmit();">작성</button>	
							</div>
						</c:if>
								<c:if test="${member.userId == null}">
									<p class="lead">로그인 후에 작성하실 수 있습니다.</p>
								</c:if>
								
					</form>
				</div>
				
			</section>
			<hr />
			
		
		<%@ include file="../footer.jsp" %>
		<script type="text/javascript" src="/resources/js/writeView.js"></script>
	</body>
</html>