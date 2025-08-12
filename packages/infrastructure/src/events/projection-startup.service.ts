import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ProjectionEventStream } from './projection.event-stream';

@Injectable()
export class ProjectionStartupService implements OnApplicationBootstrap {
  constructor(private readonly projectionEventStream: ProjectionEventStream) {}

  async onApplicationBootstrap(): Promise<void> {
    this.projectionEventStream.rebuildAll();
  }
}
