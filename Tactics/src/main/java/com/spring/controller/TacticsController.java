package com.spring.controller;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.service.TacticsService;
import com.spring.vo.MemberVO;
import com.spring.vo.TacticsVO;

@Controller
@RequestMapping("/tactics/*")
public class TacticsController {

	@Inject
	TacticsService service;

	private static final Logger logger = LoggerFactory.getLogger(TacticsController.class);

	@RequestMapping(value = "tactics", method = RequestMethod.GET)
	public void tactics(TacticsVO tacticsVO, Model model, HttpSession session) throws Exception {
		logger.info("tactics");
		
		MemberVO memberVO = (MemberVO) session.getAttribute("member");
		String user_id = memberVO.getUserId();
		
		model.addAttribute("tacticsList", service.tacticsList(user_id));
	}

	@RequestMapping(value = "tacticsSave", method = RequestMethod.POST)
	@ResponseBody
	public void tacticsSave(HttpServletRequest req, HttpSession session) throws Exception {
		logger.info("tacticsSave");

		MemberVO memberVO = (MemberVO) session.getAttribute("member");
		String user_id = memberVO.getUserId();
		
		String textSaveName = (req.getParameter("textSaveName"));
		String scene = (req.getParameter("sceneJson"));
		
		String fileName = "C:\\Users\\jeong\\git\\Project\\Tactics\\src\\main\\webapp\\resources\\saveFolder\\" + user_id + "_" + textSaveName + ".txt";

		try {
			BufferedWriter fw = new BufferedWriter(new FileWriter(fileName, true));
			
			fw.write(scene);
			fw.flush();
			fw.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		TacticsVO tacticsVO = new TacticsVO();
		tacticsVO.setTitle(textSaveName);
		tacticsVO.setUrl(fileName);
		tacticsVO.setUser_id(user_id);
		
		service.tacticsInsert(tacticsVO);
	}
}