/// <reference types="cypress" />

describe('Criar dispositivo', () => {

  it('Criar um dispositivo com sucesso', () => {
    const novoDispositivo = {
      name: 'Novo Dispositivo',
      data: {
        year: 2024,
        price: 1999.99,
        'CPU model': 'Intel i7',
        'Hard disk size': '512GB SSD'
      }
    }

    cy.request({
      method: 'POST',
      url: 'https://api.restful-api.dev/objects',
      body: novoDispositivo
    }).then((response) => {
      console.log('POST Response:', response.body)
      cy.log(`Status: ${response.status}`)
      cy.log(`ID criado: ${response.body.id}`)
      cy.log(`Name: ${response.body.name}`)
      cy.log(`CreatedAt: ${response.body.createdAt}`)
      cy.log(`Response completo: ${JSON.stringify(response.body)}`)
      
      // valida status code (200 para POST nesta API)
      expect(response.status).to.eq(200)

      // valida estrutura do body
      expect(response.body).to.exist.and.be.an('object')
      expect(response.body).to.have.property('id').and.be.a('string')
      expect(response.body).to.have.property('name').and.equal(novoDispositivo.name)
      expect(response.body).to.have.property('data').and.be.an('object')
      expect(response.body).to.have.property('createdAt').and.be.a('string')

      // valida dados retornados
      expect(response.body.data).to.deep.equal(novoDispositivo.data)
    })
  })

})
