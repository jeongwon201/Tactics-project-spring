package com.spring.controller;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.spring.service.DatahouseService;
import com.spring.vo.PageMaker;
import com.spring.vo.SearchCriteria;

@Controller
@RequestMapping("/tactics/*")
public class TacticsController {

	@Inject
	DatahouseService service;

	private static final Logger logger = LoggerFactory.getLogger(TacticsController.class);

	@RequestMapping(value = "/tactics/tactics", method = RequestMethod.GET)
	public void tactics() throws Exception {
		logger.info("tactics");

	}

	@RequestMapping(value = "/tactics/mytactics", method = RequestMethod.GET)
	public void mytactics() throws Exception {
		logger.info("mytactics");

	}
}