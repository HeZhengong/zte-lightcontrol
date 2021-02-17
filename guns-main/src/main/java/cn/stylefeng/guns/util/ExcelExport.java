package cn.stylefeng.guns.util;

import cn.afterturn.easypoi.excel.ExcelExportUtil;
import cn.afterturn.easypoi.excel.entity.ExportParams;
import org.apache.poi.ss.usermodel.Workbook;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.List;

public class ExcelExport {

    /**
     * 导出工具方法
     * @param list userList
     * @param title excel header
     * @param sheetName sheet 名
     * @param pojoClass user
     * @param fileName  文件名
     * @param response  response
     */
    public static void exportExcel(List<?> list, String title, String sheetName, Class<?> pojoClass, String fileName, HttpServletResponse response){
        defaultExport(list, pojoClass, fileName, response, new ExportParams(title, sheetName));
    }

    private static void defaultExport(List<?> list, Class<?> pojoClass, String fileName, HttpServletResponse response, ExportParams exportParams) {
        Workbook workbook = ExcelExportUtil.exportExcel(exportParams,pojoClass,list);
        downLoadExcel(fileName, response, workbook);
    }

    private static void downLoadExcel(String fileName, HttpServletResponse response, Workbook workbook) {
        try {
            response.setCharacterEncoding("UTF-8");
            response.setHeader("content-Type", "application/vnd.ms-excel");
            response.setHeader("Content-Disposition","attachment;filename=" + URLEncoder.encode(fileName, "UTF-8"));
            OutputStream outputStream = response.getOutputStream();
            workbook.write(outputStream);
            workbook.close();
            outputStream.flush();
            outputStream.close();
        } catch (IOException e) {
            e.getMessage();
        }
    }
}
