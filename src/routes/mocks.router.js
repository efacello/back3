    import { Router } from "express";
    import mocksController from "../controllers/mocks.controller.js"

    const router = Router ();

    router.get('/mockingpets',mocksController.mockingPets);
    router.get('/mockingusers/:count', mocksController.mockingUsers);
    router.get('/mockingusers', (req, res) => {
        mocksController.mockingUsers({ params: { count: 50 } }, res);
    });
    router.post('/generateData/:users/:pets',mocksController.generateData);

    export default router;