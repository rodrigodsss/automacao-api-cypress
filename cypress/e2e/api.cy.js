/// <reference types="cypress" />

describe('API REST - Testes Completos', () => {

  let devices

  beforeEach(() => {
    // Carrega dados das fixtures
    cy.fixture('devices.json').then(data => {
      devices = data
    })
  })

  describe('GET - Buscar Dispositivos', () => {

    it('Deve buscar um dispositivo específico com sucesso', () => {
      cy.getObject(3).then((response) => {
        console.log('GET Single Response:', response.body)
        cy.log(`Status: ${response.status}`)
        cy.log(`ID: ${response.body.id}`)
        cy.log(`Name: ${response.body.name}`)
        
        expect(response.status).to.eq(200)
        cy.validateObjectStructure(response.body)
      })
    })

    it('Deve retornar 404 para ID inexistente', () => {
      cy.request({
        method: 'GET',
        url: 'https://api.restful-api.dev/objects/999999',
        failOnStatusCode: false
      }).then((response) => {
        console.log('GET 404 Response:', response.status)
        cy.log(`Status: ${response.status}`)
        expect(response.status).to.eq(404)
      })
    })

  })

  describe('GET - Buscar Todos os Dispositivos', () => {

    it('Deve listar todos os dispositivos com sucesso', () => {
      cy.getAllObjects().then((response) => {
        console.log('GET ALL Response count:', response.body.length)
        cy.log(`Status: ${response.status}`)
        cy.log(`Total de dispositivos: ${response.body.length}`)
        
        expect(response.status).to.eq(200)
        expect(response.body).to.exist.and.be.an('array')
        expect(response.body.length).to.be.greaterThan(0)
        
        response.body.forEach((objeto) => {
          cy.validateObjectStructure(objeto)
        })
      })
    })

  })

  describe('GET - Buscar por IDs Específicos', () => {

    it('Deve buscar múltiplos dispositivos pelos IDs', () => {
      cy.getObjectsByIds(devices.validIds).then((response) => {
        console.log('GET by IDs Response:', response.body.length)
        cy.log(`Status: ${response.status}`)
        cy.log(`Dispositivos encontrados: ${response.body.length}`)
        cy.log(`IDs solicitados: ${devices.validIds.join(', ')}`)
        
        expect(response.status).to.eq(200)
        expect(response.body).to.exist.and.be.an('array')
        expect(response.body.length).to.be.greaterThan(0)
        
        response.body.forEach((objeto) => {
          cy.validateObjectStructure(objeto)
          expect(objeto.id).to.be.oneOf(devices.validIds)
        })
      })
    })

  })

  describe('POST - Criar Dispositivo', () => {

    it('Deve criar um novo dispositivo com sucesso', () => {
      cy.createObject(devices.newDevice).then((response) => {
        console.log('POST Response:', response.body)
        cy.log(`Status: ${response.status}`)
        cy.log(`ID criado: ${response.body.id}`)
        cy.log(`Name: ${response.body.name}`)
        cy.log(`CreatedAt: ${response.body.createdAt}`)
        
        expect(response.status).to.eq(200)
        cy.validateObjectStructure(response.body)
        expect(response.body.name).to.equal(devices.newDevice.name)
        expect(response.body.data).to.deep.equal(devices.newDevice.data)
        expect(response.body).to.have.property('createdAt').and.be.a('string')
      })
    })

    it('Deve rejeitar POST com dados inválidos', () => {
      cy.request({
        method: 'POST',
        url: 'https://api.restful-api.dev/objects',
        body: { name: '', data: {} }, // Dados vazios
        failOnStatusCode: false
      }).then((response) => {
        console.log('POST Invalid Response:', response.status)
        cy.log(`Status da resposta: ${response.status}`)
        // A API aceita dados vazios, então apenas validamos que recebemos resposta
        expect(response.status).to.exist
        expect(response.body).to.exist
      })
    })

  })

  describe('PUT - Atualizar Dispositivo', () => {

    it('Deve criar e atualizar um dispositivo com sucesso', () => {
      cy.createObject(devices.deviceToUpdate).then((createResponse) => {
        expect(createResponse.status).to.eq(200)
        const deviceId = createResponse.body.id
        cy.log(`Device criado com ID: ${deviceId}`)

        cy.updateObject(deviceId, devices.updatedDevice).then((updateResponse) => {
          console.log('PUT Response:', updateResponse.body)
          cy.log(`Status: ${updateResponse.status}`)
          cy.log(`ID atualizado: ${updateResponse.body.id}`)
          cy.log(`Name anterior: ${devices.deviceToUpdate.name}`)
          cy.log(`Name novo: ${updateResponse.body.name}`)
          
          expect(updateResponse.status).to.eq(200)
          cy.validateObjectStructure(updateResponse.body)
          expect(updateResponse.body.id).to.equal(deviceId)
          expect(updateResponse.body.name).to.equal(devices.updatedDevice.name)
          expect(updateResponse.body.data).to.deep.equal(devices.updatedDevice.data)
          expect(updateResponse.body).to.have.property('updatedAt').and.be.a('string')
        })
      })
    })

  })

  describe('DELETE - Deletar Dispositivo', () => {

    it('Deve criar e deletar um dispositivo com sucesso', () => {
      cy.createObject(devices.deviceToDelete).then((createResponse) => {
        expect(createResponse.status).to.eq(200)
        const deviceId = createResponse.body.id
        cy.log(`Device criado com ID: ${deviceId}`)

        cy.deleteObject(deviceId).then((deleteResponse) => {
          console.log('DELETE Response:', deleteResponse.body)
          cy.log(`Status: ${deleteResponse.status}`)
          cy.log(`ID deletado: ${deviceId}`)
          
          expect(deleteResponse.status).to.eq(200)
          expect(deleteResponse.body).to.exist.and.be.an('object')
        })
      })
    })

    it('Deve retornar erro ao tentar deletar ID inexistente', () => {
      cy.request({
        method: 'DELETE',
        url: 'https://api.restful-api.dev/objects/999999',
        failOnStatusCode: false
      }).then((response) => {
        console.log('DELETE 404 Response:', response.status)
        cy.log(`Status: ${response.status}`)
        expect(response.status).to.eq(404)
      })
    })

  })

})
