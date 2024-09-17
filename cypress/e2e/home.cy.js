describe('home', () => {
  it('webapp must be online', () => {
    cy.visit('/')

    cy.title('eq','Gerencie suas tarefas com Mark L')
  })
})