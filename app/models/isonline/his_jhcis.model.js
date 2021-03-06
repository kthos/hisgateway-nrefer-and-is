"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbName = process.env.HIS_DB_NAME;
class HisJhcisModel {
    check() {
        return true;
    }
    getTableName(knex) {
        return knex
            .select('TABLE_NAME')
            .from('information_schema.tables')
            .where('TABLE_SCHEMA', '=', dbName);
    }
    getPerson(knex, columnName, searchText) {
        columnName = columnName === 'cid' ? 'idcard' : columnName;
        columnName = columnName === 'hn' ? 'pid' : columnName;
        return knex
            .select('pid as hn', 'idcard as cid', 'prename', 'fname', 'lname', 'birth as dob', 'sex', 'hnomoi as address', 'mumoi as moo', 'roadmoi as road', 'telephoneperson as tel', 'postcodemoi as zip', 'occupa as occupation')
            .select(knex.raw('concat(provcodemoi, distcodemoi, subdistcodemoi) as addcode'))
            .from('person')
            .where(columnName, "=", searchText);
    }
    getOpdService(knex, hn, date) {
        return knex
            .select('pid as hn', 'visitno', 'visitdate as date', 'timestart as time')
            .select(knex.raw("case when LOCATE('/', pressure) then SUBSTR(pressure,1,LOCATE('/', pressure)-1) else '' end as bp_systolic"))
            .select(knex.raw("case when LOCATE('/', pressure) then SUBSTR(pressure,LOCATE('/', pressure)+1) else '' end as bp_diastolic"))
            .select('pulse as pr', 'respri as rr', 'weight', 'height', 'waist', 'temperature as tem')
            .from('visit')
            .where('pid', "=", hn)
            .where('visitdate', "=", date);
    }
    getDiagnosisOpd(knex, visitno) {
        return knex
            .select('vn as visitno', 'diag as diagcode', 'type as diag_type')
            .from('opd_dx')
            .where('vn', "=", visitno);
    }
    getProcedureOpd(knex, columnName, searchNo, hospCode) {
        return knex
            .select('*')
            .from('procedure_opd')
            .where(columnName, "=", searchNo);
    }
    getChargeOpd(knex, columnName, searchNo, hospCode) {
        return knex
            .select('*')
            .from('charge_opd')
            .where(columnName, "=", searchNo);
    }
    getDrugOpd(knex, columnName, searchNo, hospCode) {
        return knex
            .select('*')
            .from('drug_opd')
            .where(columnName, "=", searchNo);
    }
    getAdmission(knex, columnName, searchNo, hospCode) {
        return knex
            .select('*')
            .from('admission')
            .where(columnName, "=", searchNo);
    }
    getDiagnosisIpd(knex, columnName, searchNo, hospCode) {
        return knex
            .select('*')
            .from('diagnosis_ipd')
            .where(columnName, "=", searchNo);
    }
    getProcedureIpd(knex, columnName, searchNo, hospCode) {
        return knex
            .select('*')
            .from('procedure_ipd')
            .where(columnName, "=", searchNo);
    }
    getChargeIpd(knex, columnName, searchNo, hospCode) {
        return knex
            .select('*')
            .from('charge_ipd')
            .where(columnName, "=", searchNo);
    }
    getDrugIpd(knex, columnName, searchNo, hospCode) {
        return knex
            .select('*')
            .from('drug_ipd')
            .where(columnName, "=", searchNo);
    }
    getAccident(knex, columnName, searchNo, hospCode) {
        return knex
            .select('*')
            .from('accident')
            .where(columnName, "=", searchNo);
    }
    getAppointment(knex, columnName, searchNo, hospCode) {
        return knex
            .select('*')
            .from('appointment')
            .where(columnName, "=", searchNo);
    }
    getData(knex, tableName, columnName, searchNo, hospCode) {
        return knex
            .select('*')
            .from(tableName)
            .where(columnName, "=", searchNo)
            .limit(5000);
    }
}
exports.HisJhcisModel = HisJhcisModel;
//# sourceMappingURL=his_jhcis.model.js.map