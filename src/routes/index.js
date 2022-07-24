import { Router } from "express";
import games from "./gamesRouter.js";
import rentals from "./rentalsRouter.js";
import clients from "./clientsRouter.js";
import categories from "./categoriesRouter.js";

const router = Router();

router.use(games);
router.use(rentals);
router.use(clients);
router.use(categories);

export default router;
