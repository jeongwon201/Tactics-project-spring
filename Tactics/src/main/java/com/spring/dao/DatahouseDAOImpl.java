package com.spring.dao;

import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.spring.vo.DatahouseVO;
import com.spring.vo.SearchCriteria;

@Repository
public class DatahouseDAOImpl implements DatahouseDAO {

	@Inject
	private SqlSession sqlSession;

	//선수 목록 조회
	@Override
	public List<DatahouseVO> list(SearchCriteria scri) throws Exception {
		return sqlSession.selectList("datahouseMapper.listPage", scri);
	}

	//선수 총 갯수
	@Override
	public int listCount(SearchCriteria scri) throws Exception {
		return sqlSession.selectOne("datahouseMapper.listCount", scri);
	}
}
