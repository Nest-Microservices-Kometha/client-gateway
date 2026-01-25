import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ORDER_SERVICE } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { firstValueFrom } from 'rxjs';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Get()
  findOrders(@Query() paginationOptions: PaginationDto) {
    return this.ordersClient.send('findAllOrders', paginationOptions);
  }

  @Get(':id')
  async findOrderById(@Param('id') id: number) {
    try {
      const order = await firstValueFrom(
        this.ordersClient.send('findOneOrder', { id }),
      );

      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    console.log('ordersClient:', this.ordersClient);

    return this.ordersClient.send('createOrder', { createOrderDto });
  }

  @Patch(':id')
  async updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    try {
      const order = await firstValueFrom(
        this.ordersClient.send('changeOrderStatus', {
          id,
          ...updateOrderDto,
        }),
      );

      return order;
    } catch (error) {
      console.log('error papu');
      throw new RpcException(error);
    }
  }
}
