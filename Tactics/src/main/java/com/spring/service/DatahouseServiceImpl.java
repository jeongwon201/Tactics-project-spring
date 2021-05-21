package com.spring.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.spring.dao.DatahouseDAO;
import com.spring.vo.BoardVO;
import com.spring.vo.DatahouseVO;
import com.spring.vo.SearchCriteria;

@Service
public class DatahouseServiceImpl implements DatahouseService {

	@Inject
	private DatahouseDAO dao;

	//선수 목록 조회
	@Override
	public List<DatahouseVO> list(SearchCriteria scri) throws Exception {
		return dao.list(scri);
	}

	//선수 총 갯수
	@Override
	public int listCount(SearchCriteria scri) throws Exception {
		return dao.listCount(scri);
	}
}
