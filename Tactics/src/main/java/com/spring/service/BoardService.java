package com.spring.service;

import java.util.List;

import com.spring.vo.BoardVO;
import com.spring.vo.SearchCriteria;
import com.spring.vo.TacticsVO;

public interface BoardService {
	// 게시글 작성
	public void write(BoardVO boardVO) throws Exception;

	// 게시물 목록 조회
	public List<BoardVO> list(SearchCriteria scri) throws Exception;

	//게시물 총 갯수
	public int listCount(SearchCriteria scri) throws Exception;

	// 게시물 조회
	public BoardVO read(int bno) throws Exception;

	// 게시물 수정
	public void update(BoardVO boardVO) throws Exception;

	// 게시물 삭제
	public void delete(int bno) throws Exception;

	//전술 찾기
	public TacticsVO findTactics(TacticsVO tacticsVO) throws Exception;

	//전술 url 얻기
	public String findTacticsUrl(int url) throws Exception;
}