package com.teamProject.syusyu.service.fos.cs.impl;


import com.teamProject.syusyu.dao.cs.FaqDAO;
import com.teamProject.syusyu.domain.cs.FaqDTO;
import com.teamProject.syusyu.domain.cs.FaqSearchCondition;
import com.teamProject.syusyu.service.fos.cs.FaqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class FaqServiceImpl implements FaqService {

    FaqDAO faqDao;

    @Autowired
    public FaqServiceImpl(FaqDAO faqDao) {
        this.faqDao = faqDao;
    }

    @Override
    public int getCount() throws Exception{
        return faqDao.count();
    }

    @Override
    public int remove(Integer faqNo, String writer) throws Exception{
        return faqDao.delete(faqNo,writer);
    }

    @Override
    public int write(FaqDTO faqDtO)throws Exception{
        return faqDao.insert(faqDtO);
    }

    @Override
    public List<FaqDTO> getList() throws Exception{
        System.out.println("FaqServiceImpl.getList()");
        return faqDao.selectAll();
    }

    @Override
    public FaqDTO read(Integer faqNo) throws Exception{
        FaqDTO faqDto = faqDao.select(faqNo);
        return faqDto;
    }

    @Override
    public List<FaqDTO>getPage(Map map) throws Exception{
        return faqDao.selectPage(map);
    }

    @Override
    public int modify(FaqDTO faqDto)throws Exception{
        return faqDao.update(faqDto);
    }


    @Override
    public List<FaqDTO> getSearchResultPage(FaqSearchCondition fsc)throws Exception{
        return faqDao.searchSelectPage(fsc);
    }

    @Override
    public int getSearchResultCnt(FaqSearchCondition fsc)throws Exception{
        return faqDao.searchResultCnt(fsc);
    }




}