import { Test, TestingModule } from '@nestjs/testing';
import { ProjectionStartupService } from './projection-startup.service';
import { ProjectionEventStream } from './projection.event-stream';

describe('ProjectionStartupService', () => {
  let service: ProjectionStartupService;
  let projectionEventStream: jest.Mocked<ProjectionEventStream>;

  beforeEach(async () => {
    const mockProjectionEventStream = {
      rebuildAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectionStartupService,
        {
          provide: ProjectionEventStream,
          useValue: mockProjectionEventStream,
        },
      ],
    }).compile();

    service = module.get<ProjectionStartupService>(ProjectionStartupService);
    projectionEventStream = module.get(ProjectionEventStream);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call rebuildAll on application bootstrap', async () => {
    await service.onApplicationBootstrap();

    expect(projectionEventStream.rebuildAll).toHaveBeenCalledTimes(1);
  });
});
