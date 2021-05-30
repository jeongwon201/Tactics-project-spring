package com.spring.dao;

import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.spring.vo.TacticsVO;

@Repository
public class TacticsDAOImpl implements TacticsDAO {
	@Inject
	SqlSession sql;
	
	@Override // 내 전술 목록
	public List<TacticsVO> tacticsList(String user_id) throws Exception {
		return sql.selectList("tacticsMapper.tacticsList", user_id);
	}
	
	@Override // 전술 저장
	public void tacticsInsert(TacticsVO tacticsVO) throws Exception {
		sql.insert("tacticsMapper.tacticsInsert", tacticsVO);
	}
}
