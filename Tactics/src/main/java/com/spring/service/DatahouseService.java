package com.spring.service;

import java.util.List;

import com.spring.vo.DatahouseVO;
import com.spring.vo.SearchCriteria;

public interface DatahouseService {
	//선수 목록 조회
	public List<DatahouseVO> list(SearchCriteria scri) throws Exception;

	//선수 총 갯수
	public int listCount(SearchCriteria scri) throws Exception;
}
