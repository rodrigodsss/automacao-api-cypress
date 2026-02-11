/// <reference types="cypress" />

describe('Buscar todos os dispositivos', () => {

  it('Buscar todos os dispositivos com sucesso', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.restful-api.dev/objects'
    }).then((response) => {
      console.log('GET ALL Response:', response.body)
      cy.log(`Status: ${response.status}`)
      cy.log(`Total de dispositivos: ${response.body.length}`)
      
      // valida status code
      expect(response.status).to.eq(200)

      // valida estrutura do body
      expect(response.body).to.exist.and.be.an('array')
      expect(response.body.length).to.be.greaterThan(0)

      // valida que cada objeto tem as propriedades esperadas
      response.body.forEach((objeto) => {
        expect(objeto).to.have.property('id').and.be.a('string')
        expect(objeto).to.have.property('name').and.be.a('string')
        expect(objeto).to.have.property('data')
        
        // data pode ser null ou object
        if (objeto.data !== null) {
          expect(objeto.data).to.be.an('object')
        }
      })
    })
  })

})