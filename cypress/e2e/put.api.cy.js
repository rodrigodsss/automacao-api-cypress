/// <reference types="cypress" />

describe('Atualizar dispositivo', () => {

  it('Atualizar um dispositivo com sucesso', () => {
    const novoDispositivo = {
      name: 'Dispositivo para Atualizar',
      data: {
        year: 2024,
        price: 1999.99
      }
    }

    const dispositivoAtualizado = {
      name: 'Dispositivo Atualizado',
      data: {
        year: 2025,
        price: 2499.99,
        'CPU model': 'Intel i9',
        'Hard disk size': '1TB SSD'
      }
    }

    // Primeiro criar um dispositivo
    cy.request({
      method: 'POST',
      url: 'https://api.restful-api.dev/objects',
      body: novoDispositivo
    }).then((response) => {
      expect(response.status).to.eq(200)
      const novoId = response.body.id

      // Depois atualizar o dispositivo criado
      cy.request({
        method: 'PUT',
        url: `https://api.restful-api.dev/objects/${novoId}`,
        body: dispositivoAtualizado
      }).then((updateResponse) => {
        console.log('PUT Response:', updateResponse.body)
        cy.log(`Status: ${updateResponse.status}`)
        cy.log(`ID atualizado: ${updateResponse.body.id}`)
        cy.log(`Name: ${updateResponse.body.name}`)
        cy.log(`UpdatedAt: ${updateResponse.body.updatedAt}`)
        cy.log(`Response completo: ${JSON.stringify(updateResponse.body)}`)
        
        // valida status code (200 para PUT)
        expect(updateResponse.status).to.eq(200)

        // valida estrutura do body
        expect(updateResponse.body).to.exist.and.be.an('object')
        expect(updateResponse.body).to.have.property('id').and.equal(novoId)
        expect(updateResponse.body).to.have.property('name').and.equal(dispositivoAtualizado.name)
        expect(updateResponse.body).to.have.property('data').and.be.an('object')
        expect(updateResponse.body).to.have.property('updatedAt').and.be.a('string')

        // valida dados retornados
        expect(updateResponse.body.data).to.deep.equal(dispositivoAtualizado.data)
      })
    })
  })

})