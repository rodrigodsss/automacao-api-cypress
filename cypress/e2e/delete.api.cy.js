/// <reference types="cypress" />

describe('Deletar dispositivo', () => {

  it('Deletar um dispositivo com sucesso', () => {
    const novoDispositivo = {
      name: 'Dispositivo para Deletar',
      data: {
        year: 2024,
        price: 999.99
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

      // Depois deletar o dispositivo criado
      cy.request({
        method: 'DELETE',
        url: `https://api.restful-api.dev/objects/${novoId}`
      }).then((deleteResponse) => {
        console.log('DELETE Response:', deleteResponse.body)
        cy.log(`Status: ${deleteResponse.status}`)
        cy.log(`ID deletado: ${novoId}`)
        cy.log(`Response completo: ${JSON.stringify(deleteResponse.body)}`)
        
        // valida status code (200 para DELETE)
        expect(deleteResponse.status).to.eq(200)

        // valida que a resposta existe
        expect(deleteResponse.body).to.exist.and.be.an('object')
      })
    })
  })

})
