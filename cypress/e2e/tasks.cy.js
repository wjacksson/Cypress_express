
/// <reference types="cypress" />


//import {faker} from '@faker-js/faker'

describe('tasks', ()=> {

    let testData;

    before(()=>{
        cy.fixture('tasks').then(t=>{
            testData = t
        })
    })

    context('register', ()=>{
        it('It must create a new task', ()=>{

            const taskName = 'Read a book about JS'
    
            cy.removeTaskByName(taskName)
            cy.createTask(taskName)
    
            cy.contains('main div p', taskName)
            .should('be.visible')
        })
    
        it('Do not allow duplicated tasks', ()=>{
    
            const task = testData.dup
    
            cy.removeTaskByName(task.name)
            cy.postTask(task)
            cy.createTask(task.name)
    
            cy.get('.swal2-html-container').should('be.visible')
            .should('have.text', 'Task already exists!')
    
        })
    
        it('Required field', ()=>{
            cy.createTask()
            cy.isRequired('This is a required field')
        })
    })

    context('updation', ()=>{
        it ('It must conclude a task', ()=>{
            const task = {
                name: 'hello there',
                is_done: false
            } 

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name).parent()
            .find('button[class*=ItemToggle]')
            .click()

            cy.contains('p', task.name)
            .should('have.css', 'text-decoration-line','line-through')
            
        })

    })

    context('exclusion', ()=>{
        it ('It must remove a task', ()=>{
            const task = {
                name: 'Estudar JavaScript',
                is_done: false
            } 

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name).parent()
            .find('button[class*=ItemDelete]')
            .click()
            
            cy.contains('p', task.name)
            .should('not.exist')
        
        })

    })
})

