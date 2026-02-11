/// <reference types="cypress" />

describe('Buscar um dispositivo específico', () => {

  it('Buscar um dispositivo com sucesso', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.restful-api.dev/objects/3'
    }).then((response) => {
      console.log('GET Response:', response.body)
      cy.log(`Status: ${response.status}`)
      cy.log(`Response: ${JSON.stringify(response.body)}`)
      
      // valida status code
      expect(response.status).to.eq(200)

      // valida estrutura do body
      expect(response.body).to.exist.and.be.an('object')
      expect(response.body).to.have.property('id').and.be.a('string')
      expect(response.body).to.have.property('name').and.be.a('string')
      expect(response.body).to.have.property('data')

      // data pode ser null ou object
      if (response.body.data !== null) {
        expect(response.body.data).to.be.an('object')
      }
    })
  })

})
                              