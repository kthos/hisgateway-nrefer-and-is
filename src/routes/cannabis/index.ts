/// <reference path="../../../typings.d.ts" />

import * as Knex from 'knex';
import * as fastify from 'fastify';
import * as HttpStatus from 'http-status-codes';
var http = require('http');

import { CannabisModel } from '../../models/cannabis';
const cannabisModel = new CannabisModel();

const router = (fastify, { }, next) => {
  var db: Knex = fastify.dbCannabis;

  fastify.get('/', { preHandler: [fastify.serviceMonitoring] }, async (req: fastify.Request, reply: fastify.Reply) => {
    reply.send({ api: 'Cannabis API Serivce' });
  })

  fastify.post('/test-connection', { preHandler: [fastify.serviceMonitoring] }, async (req: fastify.Request, reply: fastify.Reply) => {
    try {
      const result: any = await cannabisModel.testConnection(db);
      reply.send({
        statusCode: HttpStatus.OK,
        rows: result
      });
    } catch (error) {
      reply.send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      });
    }
  })

  fastify.post('/patient', { preHandler: [fastify.serviceMonitoring, fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const cid = req.body.cid;

    if (cid) {
      try {
        const result: any = await cannabisModel.searchPatient(db, cid);
        reply.send({
          statusCode: HttpStatus.OK,
          rows: result
        });
      } catch (error) {
        console.log('patient', error.message);
        reply.send({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message
        });
      }
    } else {
      reply.send({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'not found parameter.'
      });
    }
  })

  fastify.post('/visit', { preHandler: [fastify.serviceMonitoring, fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const hn = req.body.hn || '';
    if (hn) {
      try {
        const result: any = await cannabisModel.searchVisit(db, hn);
        reply.send({
          statusCode: HttpStatus.OK,
          rows: result
        });
      } catch (error) {
        console.log('visit', error.message);
        reply.send({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message
        });
      }
    } else {
      reply.send({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'parameter not found.'
      });
    }
  })

  fastify.post('/patient-info', { preHandler: [fastify.serviceMonitoring, fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const hn = req.body.hn || '';

    if (hn) {
      try {
        const result: any = await cannabisModel.patientInfo(db, hn);
        reply.send({
          statusCode: HttpStatus.OK,
          rows: result
        });
      } catch (error) {
        console.log('patient-info', error.message);
        reply.send({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message
        });
      }
    } else {
      reply.send({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'parameter not found.'
      });
    }
  })

  fastify.post('/lab', { preHandler: [fastify.serviceMonitoring, fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const hn = req.body.hn || '';
    const vn = req.body.vn || '';

    if (hn && vn) {
      try {
        const result: any = await cannabisModel.getVisitLab(db, hn, vn);
        reply.send({
          statusCode: HttpStatus.OK,
          rows: result
        });
      } catch (error) {
        console.log('lab', error.message);
        reply.send({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message
        });
      }
    } else {
      reply.send({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'parameter not found.'
      });
    }
  })

  fastify.post('/drug', { preHandler: [fastify.serviceMonitoring, fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const hn = req.body.hn || '';
    const vn = req.body.vn || '';

    if (hn && vn) {
      try {
        const result: any = await cannabisModel.getVisitDrug(db, hn, vn);
        reply.send({
          statusCode: HttpStatus.OK,
          rows: result
        });
      } catch (error) {
        console.log('getVisitDrug', error.message);
        reply.send({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message
        });
      }
    } else {
      reply.send({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'parameter not found.'
      });
    }
  })

  fastify.post('/appointment', { preHandler: [fastify.serviceMonitoring, fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const hn = req.body.hn || '';
    const vn = req.body.vn || '';

    if (hn && vn) {
      try {
        const result: any = await cannabisModel.getVisitAppointment(db, hn, vn);
        reply.send({
          statusCode: HttpStatus.OK,
          rows: result
        });
      } catch (error) {
        console.log('getVisitAppointment', error.message);
        reply.send({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message
        });
      }
    } else {
      reply.send({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'parameter not found.'
      });
    }
  })

  fastify.post('/diag-text', { preHandler: [fastify.serviceMonitoring, fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const hn = req.body.hn || '';
    const vn = req.body.vn || '';

    if (hn && vn) {
      try {
        const result: any = await cannabisModel.getVisitDiagText(db, hn, vn);
        reply.send({
          statusCode: HttpStatus.OK,
          rows: result
        });
      } catch (error) {
        console.log('diag-text', error.message);
        reply.send({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message
        });
      }
    } else {
      reply.send({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'parameter not found.'
      });
    }
  })

  fastify.post('/diagnosis', { preHandler: [fastify.serviceMonitoring, fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const hn = req.body.hn || '';
    const vn = req.body.vn || '';

    if (hn && vn) {
      try {
        const result: any = await cannabisModel.getVisitDiagnosis(db, hn, vn);
        reply.send({
          statusCode: HttpStatus.OK,
          rows: result
        });
      } catch (error) {
        console.log('diagnosis', error.message);
        reply.send({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message
        });
      }
    } else {
      reply.send({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'parameter not found.'
      });
    }
  })

  fastify.post('/procedure', { preHandler: [fastify.serviceMonitoring, fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const hn = req.body.hn || '';
    const vn = req.body.vn || '';

    if (hn && vn) {
      try {
        const result: any = await cannabisModel.getVisitProcedure(db, hn, vn);
        reply.send({
          statusCode: HttpStatus.OK,
          rows: result
        });
      } catch (error) {
        console.log('procedure', error.message);
        reply.send({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message
        });
      }
    } else {
      reply.send({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'parameter not found.'
      });
    }
  })

  fastify.post('/screening', { preHandler: [fastify.serviceMonitoring, fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const hn = req.body.hn || '';
    const vn = req.body.vn || '';

    if (hn && vn) {
      try {
        const result: any = await cannabisModel.getVisitScreening(db, hn, vn);
        reply.send({
          statusCode: HttpStatus.OK,
          rows: result
        });
      } catch (error) {
        console.log('screening', error.message);
        reply.send({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message
        });
      }
    } else {
      reply.send({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'parameter not found.'
      });
    }
  })

  next();
}


module.exports = router;
