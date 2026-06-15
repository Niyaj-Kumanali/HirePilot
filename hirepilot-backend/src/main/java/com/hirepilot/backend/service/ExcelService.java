package com.hirepilot.backend.service;

import com.hirepilot.backend.dto.HiringManagerRow;
import com.hirepilot.backend.entity.HiringManagerEntity;
import com.hirepilot.backend.entity.UserEntity;
import com.hirepilot.backend.repository.HiringManagerRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ExcelService {

    private final HiringManagerRepository hiringManagerRepository;

    public ExcelService(HiringManagerRepository hiringManagerRepository) {
        this.hiringManagerRepository = hiringManagerRepository;
    }

    public record ParseResult(List<HiringManagerRow> rows, int duplicateCount) {}

    public ParseResult parseAndSave(MultipartFile file, String userEmail, UserEntity user) throws IOException {
        List<HiringManagerRow> result = new ArrayList<>();
        int duplicateCount = 0;
        XSSFWorkbook workbook = new XSSFWorkbook(file.getInputStream());
        Sheet sheet = workbook.getSheetAt(0);

        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            if (row == null) continue;

            String name = getCellString(row.getCell(0));
            String email = getCellString(row.getCell(1));
            String company = getCellString(row.getCell(2));
            String jobTitle = getCellString(row.getCell(3));
            String jobLocation = getCellString(row.getCell(4));

            if (name.isEmpty() || email.isEmpty() || company.isEmpty() || jobTitle.isEmpty()) continue;

            long existingSentCount = hiringManagerRepository
                    .countByUserIdAndEmailAndStatus(user.getId(), email, "SENT");
            boolean isDuplicate = existingSentCount > 0;

            if (isDuplicate) {
                duplicateCount++;
                continue;
            }

            HiringManagerEntity entity = new HiringManagerEntity();
            entity.setUser(user);
            entity.setName(name);
            entity.setEmail(email);
            entity.setCompany(company);
            entity.setJobTitle(jobTitle);
            entity.setJobLocation(jobLocation);
            entity.setBatchFileName(file.getOriginalFilename());
            entity.setStatus("PENDING");
            entity.setResendConfirmed(false);
            hiringManagerRepository.save(entity);

            result.add(new HiringManagerRow(
                entity.getId(), name, email, company, jobTitle, jobLocation,
                null, null, entity.getStatus(), null, 0, false, false
            ));
        }

        workbook.close();
        return new ParseResult(result, duplicateCount);
    }

    private String getCellString(Cell cell) {
        if (cell == null) return "";
        return switch (cell.getCellType()) {
            case STRING -> cell.getStringCellValue().trim();
            case NUMERIC -> String.valueOf((long) cell.getNumericCellValue());
            default -> "";
        };
    }
}
