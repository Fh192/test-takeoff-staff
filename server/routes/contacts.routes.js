const Router = require('express');
const router = new Router();
const contactsController = require('../controllers/contacts.controller');

router.get('/contacts', contactsController.getContacts);
router.post('/contacts', contactsController.addContact);
router.put('/contacts/:id', contactsController.updateContact);
router.delete('/contacts/:id', contactsController.deleteContact);

module.exports = router;
