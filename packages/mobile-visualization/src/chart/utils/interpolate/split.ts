type Point = [number, number];

type CommandType =
  | 'M'
  | 'L'
  | 'H'
  | 'V'
  | 'C'
  | 'S'
  | 'Q'
  | 'T'
  | 'A'
  | 'Z'
  | 'm'
  | 'l'
  | 'h'
  | 'v'
  | 'c'
  | 's'
  | 'q'
  | 't'
  | 'a'
  | 'z';

export type PathCommand = {
  type: CommandType;
  x?: number;
  y?: number;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  rx?: number;
  ry?: number;
  xAxisRotation?: number;
  largeArcFlag?: number;
  sweepFlag?: number;
  [key: string]: number | string | undefined;
};

type SplitResult = {
  left: Point[];
  right: Point[];
};

function decasteljau(points: Point[], t: number): SplitResult {
  const left: Point[] = [];
  const right: Point[] = [];

  function decasteljauRecurse(recursePoints: Point[], recurseT: number): void {
    if (recursePoints.length === 1) {
      left.push(recursePoints[0]);
      right.push(recursePoints[0]);
    } else {
      const newPoints: Point[] = Array(recursePoints.length - 1);

      for (let i = 0; i < newPoints.length; i++) {
        if (i === 0) {
          left.push(recursePoints[0]);
        }
        if (i === newPoints.length - 1) {
          right.push(recursePoints[i + 1]);
        }

        newPoints[i] = [
          (1 - recurseT) * recursePoints[i][0] + recurseT * recursePoints[i + 1][0],
          (1 - recurseT) * recursePoints[i][1] + recurseT * recursePoints[i + 1][1],
        ];
      }

      decasteljauRecurse(newPoints, recurseT);
    }
  }

  if (points.length) {
    decasteljauRecurse(points, t);
  }

  return { left, right: right.reverse() };
}

function pointsToCommand(points: Point[]): PathCommand {
  const command: Partial<PathCommand> = {};

  if (points.length === 4) {
    command.x2 = points[2][0];
    command.y2 = points[2][1];
  }
  if (points.length >= 3) {
    command.x1 = points[1][0];
    command.y1 = points[1][1];
  }

  command.x = points[points.length - 1][0];
  command.y = points[points.length - 1][1];

  if (points.length === 4) {
    command.type = 'C';
  } else if (points.length === 3) {
    command.type = 'Q';
  } else {
    command.type = 'L';
  }

  return command as PathCommand;
}

function splitCurveAsPoints(points: Point[], segmentCount = 2): Point[][] {
  const segments: Point[][] = [];
  let remainingCurve: Point[] = points;
  const tIncrement = 1 / segmentCount;

  for (let i = 0; i < segmentCount - 1; i++) {
    const tRelative = tIncrement / (1 - tIncrement * i);
    const split = decasteljau(remainingCurve, tRelative);
    segments.push(split.left);
    remainingCurve = split.right;
  }

  segments.push(remainingCurve);
  return segments;
}

export default function splitCurve(
  commandStart: PathCommand,
  commandEnd: PathCommand,
  segmentCount?: number,
): PathCommand[] {
  const points: Point[] = [[commandStart.x!, commandStart.y!]];
  if (commandEnd.x1 != null) {
    points.push([commandEnd.x1, commandEnd.y1!]);
  }
  if (commandEnd.x2 != null) {
    points.push([commandEnd.x2, commandEnd.y2!]);
  }
  points.push([commandEnd.x!, commandEnd.y!]);

  return splitCurveAsPoints(points, segmentCount).map(pointsToCommand);
}
