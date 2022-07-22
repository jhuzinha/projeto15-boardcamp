import { Router } from "express";
import games from "./gamesRouter";
import rentals from "./rentalsRouter";
import clients from "./clientsRouter";
import categories from "./categoriesRouter";

const router = Router();

router.use(games);
router.use(rentals);
router.use(clients);
router.use(categories);

export default router;
