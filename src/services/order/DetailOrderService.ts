import prismaClient from "../../prisma";


interface DetailRequest{
    order_id: string;
}

class DetailOrderService{
    async execute({ order_id }: DetailRequest){
        const orders = await prismaClient.order.findMany({
            where: {
                id: order_id,
            },
            include: {
                items: {
                  select: {
                    product: true,
                    order: true
                  },
                },
              },
        });

        return orders;
    }
}

export { DetailOrderService };