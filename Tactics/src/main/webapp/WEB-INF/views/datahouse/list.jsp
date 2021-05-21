<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
	<head>
	 	<title>데이터 하우스</title>
		<%@ include file="/resources/include/head.jsp" %>
		<script src="/WEB-INF/views/datahouse/list_js.js"></script>
	</head>
	
	<body>
	
		<%@include file="../header.jsp" %>
	
		<main>
			
			<section id="container" class="container">
				<div>
					<h1>
						<strong>데이터하우스</strong>
					</h1>
					<hr />
				</div>				
				
				<div>
					<form role="form" method="get">
						<div class="search row">
							<div class="col-xs-2 col-sm-2">
								<select name="searchType" class="form-control">
									<option value="z"<c:out value="${scri.searchType == null ? 'selected' : ''}"/>>-----</option>
									<option value="l"<c:out value="${scri.searchType eq 'l' ? 'selected' : ''}"/>>리그</option>
									<option value="t"<c:out value="${scri.searchType eq 't' ? 'selected' : ''}"/>>구단</option>
									<option value="n"<c:out value="${scri.searchType eq 'n' ? 'selected' : ''}"/>>선수</option>
								</select>
							</div>
							
							<div class="col-xs-10 col-sm-10">
								<div class="input-group">
									<input type="text" name="keyword" id="keywordInput" value="${scri.keyword}" class="form-control"/>
									<span class="input-group-btn">
										<button id="searchBtn" type="button" class="btn btn-default">검색</button>
									</span>
								</div>
							</div>
						 
						</div>
						<hr />
						
						<table class="table table-hover">
							<thead>
								<tr><th>리그</th><th>구단</th><th>포지션</th><th>등번호</th><th>이름</th></tr>
							</thead>
						
							<c:forEach items="${list}" var = "list">
								<tr>
									<td><c:out value="${list.lname}" /></td>
									<td><c:out value="${list.tname}" /></td>
									<td><c:out value="${list.pos}" /></td>
									<td><c:out value="${list.bno}" /></td>
									<td><c:out value="${list.name}" /></td>
								</tr>
							</c:forEach>
						
						</table>
							
						<div class="col text-center">
							<ul class="pagination">
								<c:if test="${pageMaker.prev}">
									<li><a href="list${pageMaker.makeSearch(pageMaker.startPage - 1)}">이전</a></li>
								</c:if> 
							
								<c:forEach begin="${pageMaker.startPage}" end="${pageMaker.endPage}" var="idx">
									<li <c:out value="${pageMaker.cri.page == idx ? 'class=info' : ''}" />>
									<a href="list${pageMaker.makeSearch(idx)}">${idx}</a></li>
								</c:forEach>
							
								<c:if test="${pageMaker.next && pageMaker.endPage > 0}">
									<li><a href="list${pageMaker.makeSearch(pageMaker.endPage + 1)}">다음</a></li>
								</c:if> 
							</ul>
						</div>
					</form>
				</div>
			</section>
			
		</main>
		
		<%@ include file="../footer.jsp" %>
		
	</body>
</html>