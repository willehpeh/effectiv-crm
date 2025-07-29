import { IsString, IsNumber, IsOptional, IsBoolean, Min, Max, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class DatabaseConfigValidation {
  @IsString()
  @IsIn(['postgresql', 'sqlite'])
  @IsOptional()
  DB_TYPE?: string;
  @IsString()
  @IsOptional()
  DB_HOST?: string;

  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @Max(65535)
  @IsOptional()
  DB_PORT?: number;

  @IsString()
  @IsOptional()
  DB_USER?: string;

  @IsString()
  @IsOptional()
  DB_PASSWORD?: string;

  @IsString()
  @IsOptional()
  DB_NAME?: string;

  @IsString()
  @IsOptional()
  POSTGRES_PASSWORD?: string;

  @IsString()
  @IsOptional()
  NODE_ENV?: string;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(100)
  @IsOptional()
  DB_POOL_MIN?: number;

  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @Max(1000)
  @IsOptional()
  DB_POOL_MAX?: number;

  @IsNumber()
  @Type(() => Number)
  @Min(1000)
  @IsOptional()
  DB_POOL_ACQUIRE_TIMEOUT?: number;

  @IsNumber()
  @Type(() => Number)
  @Min(1000)
  @IsOptional()
  DB_POOL_CREATE_TIMEOUT?: number;

  @IsNumber()
  @Type(() => Number)
  @Min(1000)
  @IsOptional()
  DB_POOL_IDLE_TIMEOUT?: number;

  @IsBoolean()
  @Type(() => Boolean)
  @IsOptional()
  DB_DEBUG?: boolean;

  @IsBoolean()
  @Type(() => Boolean)
  @IsOptional()
  DB_AUTO_LOAD_ENTITIES?: boolean;

  @IsString()
  @IsOptional()
  SQLITE_DB_PATH?: string;

  @IsBoolean()
  @Type(() => Boolean)
  @IsOptional()
  SQLITE_IN_MEMORY?: boolean;
}
